<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { RobotService, TradeType, type RoleInfo, RoleType } from '@/servies/robot';
import { format_bigint, format_date, readable_robot_name } from '@/utils/common'
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Select from '@/components/futuristic/form/Select.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import Popup from '@/components/futuristic/Popup.vue';
import { MessageBox } from '@/utils/message';
import { useThemeStore } from '@/stores/theme';
import { useHttpStore } from '@/stores/http';
const theme = useThemeStore();
const route = useRoute()
const router = useRouter()
const httpStore = useHttpStore()
const Rows = [
    {
        title: 'Name',
        key: 'prefix',
    },
    {
        title: 'Role',
        key: 'roleType',
    },
    {
        title: 'Style',
        key: 'desc'
    },
    {
        title: 'Description',
        key: 'systemMessage',
    },
    {
        title: 'Date',
        key: 'createdTime'
    },
    {
        title: 'Operate',
        key: 'operate',
    }
]
const RoleTypes = [
    {
        title: 'COIN_ROBOT',
        value: 'COIN_ROBOT'
    },
    {
        title: 'FEI_SHU',
        value: 'FEI_SHU'
    }
]

const data = reactive({
    list: new Array<any>,
    query: {
        searchText: ''
    },
    queryPage: {
        page: 1,
        size: 20,
        totalPages: 0,
    },
    form: {
        prefix: '',
        desc: '',
        systemMessage: '',
        roleType: RoleType.COIN_ROBOT,
    },
    editId: '',
    editType: 0,
    tradForm: {
        userName: '',
        coinId: 'usdt',
        coinCount: 1,
    },
    transaction: false,
    transactionForm: {
        prefix: '',
        prompt: '',
    }
})
function load_data() {
    if (httpStore.client.loading) {
        return
    }
    HttpCustomConfig.loading = true;
    RobotService.getRoles(data.queryPage, data.query.searchText).then(res => {
        data.list = data.list.concat(res.data.content);
        data.queryPage.totalPages = res.data.totalPages;
        HttpCustomConfig.loading = true;
    })
}
function search() {
    data.list = [];
    data.queryPage.page = 1;
    load_data();
}
function next_page() {
    if (data.queryPage.page < data.queryPage.totalPages) {
        data.queryPage.page += 1;
        load_data();
    }
}

const popup = ref(Popup)
const add = () => {
    data.editId = '';
    data.form.prefix = '';
    data.form.desc = '';
    data.form.roleType = RoleType.COIN_ROBOT;
    data.form.systemMessage = '';
    popup.value.open();
}
const close_popup = () => {
    data.editId = '';
    data.form.desc = '';
    data.tradForm.userName = '';
    data.editType = 0;
    popup.value.close();
}
const edit = (item: RoleInfo) => {
    data.editId = item.id ? item.id : '';
    data.form.prefix = item.prefix;
    data.form.desc = item.desc ? item.desc : '';
    data.form.roleType = item.roleType;
    data.form.systemMessage = item.systemMessage;
    data.tradForm.coinCount = 0;
    popup.value.open();
}
const save_robot = async () => {
    if (data.form.prefix == '') {
        MessageBox.warning('Name is not empty');
        return
    }
    try {
        if (data.editId) {
            if (data.editType == 1) {
                if (data.tradForm.coinId == '') {
                    MessageBox.warning('Coin is not empty');
                    return
                } else if (data.tradForm.coinCount <= 0) {
                    MessageBox.warning('Must be greater than zero');
                    return
                }
                await RobotService.cryptoTrades(data.tradForm);
            } else {
                await RobotService.editRole({ id: data.editId, ...data.form });
            }

        } else {
            await RobotService.addRole(data.form);
        }
        close_popup();
        search();
    } catch (error) {
        console.error(error)
    }
}

const delPopup = ref(Popup);
const del_robot = (item: RoleInfo) => {
    data.editId = item.id ? item.id : '';
    delPopup.value.open();
}
const close_del_popup = () => {
    data.editId = '';
    delPopup.value.close();
}
const delete_robot = () => {
    RobotService.deleteRole(data.editId).then(() => {
        close_del_popup();
        search();
    }).catch(() => {
        data.editId = '';
    })
}
const change_edit_type = () => {
    data.editType = data.editType ? 0 : 1;
    if (data.editType == 1) {
        data.tradForm.userName = data.form.prefix;
    }
}
const transaction = () => {
    data.transaction = true;
    RobotService.transaction().then(() => {
        data.transaction = false;
        MessageBox.success('Successful operation')
    }).catch((e) => {
        console.error(e)
        data.transaction = false;
        MessageBox.error('Operation Failed')
    })
}
const tradePopup = ref(Popup);
const close_trade_popup = () => {
    data.transactionForm.prefix = '';
    data.transactionForm.prompt = '';
    tradePopup.value?.close();
}
const open_trade_popup = (item: RoleInfo) => {
    data.transactionForm.prefix = item.prefix;
    tradePopup.value?.open();
}
const trigger_robot = () => {
    RobotService.coinRobotTrade(data.transactionForm.prefix, data.transactionForm.prompt).then(() => {
        close_trade_popup();
        MessageBox.success('Successful operation');
    }).catch(() => {
        close_trade_popup();
        MessageBox.error('Operation Failed');
    })
}
onMounted(() => {
    load_data();
})
</script>
<template>
    <div class="h-full">
        <Card class="h-full" margin="0 2.5rem" padding="1rem 0">
            <template #header>
                <div class="flex justify-between">
                    <p class="text-center font-bold">
                        <TextAnimate :text="route.meta.title ? (route.meta.title as string) : ''" />
                    </p>
                    <div class="flex items-center">
                        <FormRowInput v-model="data.query.searchText" class="inline-block mr-4" type="text"
                            placeholder="keywords" />
                        <Button :loading="httpStore.client.loading" @click="search">Search</Button>
                        <Button class="ml-2 type0" type="default" @click="add">Add</Button>
                        <Button class="ml-2 type0" type="default" :loading="data.transaction" @click="transaction">Trigger
                            Transaction</Button>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="card-body" :class="theme.themeScrollClassName">

                    <Table :record-raw="Rows" :data="data.list">
                        <template #prefix="{ record }">
                            <RouterLink :to="'/robots/' + encodeURIComponent(record.prefix)">
                                <p class="pl-4 max-w-[8rem]">
                                    {{ readable_robot_name(record.prefix) }}
                                </p>
                            </RouterLink>
                        </template>
                        <template #desc="{ record }">
                            <p class="w-40" v-tip="record.desc ? record.desc : '---'"></p>
                        </template>
                        <template #systemMessage="{ record }">
                            <p class="w-40" v-tip="record.systemMessage ? record.systemMessage : '---'"></p>
                        </template>
                        <template #createdTime="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ format_date(record.createdTime) }}
                            </span>
                        </template>
                        <template #operate="{ record }">
                            <Button class="m-2" type="success" @click="edit(record)">Edit</Button>
                            <Button class="m-2" type="default" @click="open_trade_popup(record)">Trigger</Button>
                            <Button class="m-2" type="error" @click="del_robot(record)">Delete</Button>
                        </template>
                    </Table>
                </div>

                <div v-if="data.queryPage.page < data.queryPage.totalPages - 1 && !httpStore.client.loading"
                    class="text-center">
                    <Button @click="next_page">More</Button>
                </div>
            </template>
        </Card>
        <Popup ref="popup" width="600px">
            <template #header>
                <p class="py-4">
                    {{ data.editId ? 'Edit' : 'Add' }} Robot
                </p>
            </template>
            <template #body>
                <div v-show="data.editType == 0" class="p-4 flex flex-col gap-2">
                    <FormRowInput name="name" v-model="data.form.prefix" placeholder="Robot Name" />
                    <Select name="Type" class="w-full my-2" :data="RoleTypes" v-model="data.form.roleType"
                        placeholder="Robot Type" />
                    <FormRowInput name="Investment style" v-model="data.form.desc" type="text"
                        placeholder="Investment style" />
                    <FormRowInput name="description" v-model="data.form.systemMessage" type="textarea" :rows="8"
                        placeholder="Robot Description" />
                </div>
                <div v-show="data.editType == 1" class="p-4 flex flex-col gap-2">
                    <FormRowInput class="mb-2" name="Coin" v-model.trim="data.tradForm.coinId" disabled
                        placeholder="Coin" />
                    <FormRowInput name="Recharge Number" :min="0" type="number" v-model.number="data.tradForm.coinCount"
                        placeholder="Recharge Number" />

                </div>
                <div class="mt-4 text-right p-4">

                    <Button v-if="data.editId" type="purple" @click="change_edit_type">{{ data.editType == 0 ? 'Deposit' :
                        'Settings' }}</Button>
                    <Button class="ml-2" type="success" @click="save_robot">
                        {{ data.editType == 0 ? 'Save' : 'Recharge' }}
                    </Button>
                    <Button class="ml-2" type="default" @click="close_popup">Cancel</Button>
                </div>
            </template>
        </Popup>

        <Popup ref="delPopup">
            <template #header>
                <p class="p-4">
                    Delete The Robot ?
                </p>
            </template>
            <template #body>
                <div class="mt-4 text-right p-4">
                    <Button type="error" @click="delete_robot">Delete</Button>
                    <Button class="ml-2" type="default" @click="close_del_popup">Cancel</Button>
                </div>
            </template>
        </Popup>

        <Popup ref="tradePopup">
            <template #header>
                <p class="p-4">
                    Trigger Transaction The Robot.
                </p>
            </template>
            <template #body>
                <div class="p-4">
                    <FormRowInput v-model="data.transactionForm.prompt" placeholder="Prompt" />
                    <div class="mt-4 text-right">
                        <Button type="error" @click="trigger_robot">Trigger</Button>
                        <Button class="ml-2" type="default" @click="close_trade_popup">Cancel</Button>
                    </div>
                </div>

            </template>
        </Popup>
    </div>
</template>
<style scoped>
.card-body {
    height: calc(100vh - 17.5rem);
    overflow-y: auto;
}

.table-operate:hover>img {
    display: none;
}

.table-operate:hover>div {
    display: block;
    background-color: #081f3d;
    z-index: 100;
}
</style>