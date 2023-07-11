<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { RobotService, TradeType, type RoleInfo, RoleType } from '@/servies/robot';
import { format_bigint, format_date, readable_robot_name } from '@/utils/common'
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Select from '@/components/futuristic/form/Select.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import Popup from '@/components/futuristic/Popup.vue';
import { MessageBox } from '@/utils/message';
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const route = useRoute()
const Rows = [
    {
        title: 'Name',
        key: 'prefix',
    },
    {
        title: 'RoleType',
        key: 'roleType',
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
    loading: false,
    query: {
        searchText: ''
    },
    queryPage: {
        page: 0,
        size: 20,
        totalPages: 0,
    },
    form: {
        prefix: '',
        systemMessage: '',
        roleType: RoleType.COIN_ROBOT
    },
    editId: '',
})
function load_data() {
    if (data.loading) {
        return
    }
    HttpCustomConfig.loading = false;
    data.loading = true;
    RobotService.getRoles(data.queryPage, data.query.searchText).then(res => {
        data.list = data.list.concat(res.data.content);
        data.queryPage.totalPages = res.data.totalPages;
        HttpCustomConfig.loading = true;
        data.loading = false;
    })
}
function search() {
    data.list = [];
    data.queryPage.page = 0;
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
    data.form.roleType = RoleType.COIN_ROBOT;
    data.form.systemMessage = '';
    popup.value.open();
}
const close_popup = () => {
    data.editId = '';
    popup.value.close();
}
const edit = (item: RoleInfo) => {
    data.editId = item.id ? item.id : '';
    data.form.prefix = item.prefix;
    data.form.roleType = item.roleType;
    data.form.systemMessage = item.systemMessage;
    popup.value.open();
}
const save_robot = async () => {
    if (data.form.prefix == '') {
        MessageBox.warning('Name is not empty');
        return
    }
    try {
        if (data.editId) {
            await RobotService.editRole({ id: data.editId, ...data.form });
        } else {
            await RobotService.addRole(data.form);
        }
        close_popup();
        search();
    } catch (error) {
        data.editId = '';
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
onMounted(() => {
    load_data();
})
</script>
<template>
    <div class="py-6">
        <Card>
            <template #header>
                <p class="text-center font-bold">
                    <TextAnimate :text="route.meta.title ? (route.meta.title as string) : ''" />
                </p>
            </template>
            <template #body>
                <div class="min-h-[50vh]">
                    <div class="flex items-center">
                        <FormRowInput v-model="data.query.searchText" class="inline-block mr-4" type="text"
                            placeholder="keywords" />
                        <Button :loading="data.loading" @click="search">search</Button>
                        <Button class="ml-2 type0" type="default" @click="add">add</Button>
                    </div>
                    <Table :record-raw="Rows" :data="data.list" :loading="data.loading">
                        <template #prefix="{ record }">
                            <span class="pl-4">
                                {{ readable_robot_name(record.prefix) }}
                            </span>
                        </template>
                        <template #systemMessage="{ record }">
                            <p class="text-[#009688] px-2 max-h-24 overflow-x-auto overflow-y-auto"
                                :class="theme.themeScrollClassName">
                                {{ record.systemMessage ? record.systemMessage : '---' }}
                            </p>
                        </template>
                        <template #createdTime="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ format_date(record.createdTime) }}
                            </span>
                        </template>
                        <template #operate="{ record }">
                            <Button @click="edit(record)">edit</Button>
                            <Button class="ml-2" type="error" @click="del_robot(record)">delete</Button>
                        </template>
                    </Table>
                </div>

                <div v-if="data.queryPage.page < data.queryPage.totalPages - 1 && !data.loading" class="text-center">
                    <Button @click="next_page">More</Button>
                </div>
            </template>
        </Card>
        <Popup ref="popup" width="500px">
            <template #header>
                <span>
                    {{ data.editId?'Edit':'Add' }} Robot
                </span>
            </template>
            <template #body>
                <div>
                    <FormRowInput name="name" v-model="data.form.prefix" placeholder="Robot Name" />
                    <Select name="Type" class="w-full my-2" :data="RoleTypes" v-model="data.form.roleType"
                        placeholder="Robot Type" />
                    <FormRowInput name="description" v-model="data.form.systemMessage" type="textarea" :rows="8"
                        placeholder="Robot Description" />
                </div>
                <div class="mt-4 text-right">
                    <Button type="success" @click="save_robot">Save</Button>
                    <Button class="ml-2" type="default" @click="close_popup">Cancel</Button>
                </div>
            </template>
        </Popup>

        <Popup ref="delPopup">
            <template #header>
                <span>
                    Delete The Robot ?
                </span>
            </template>
            <template #body>
                <div class="mt-4 text-right">
                    <Button type="error" @click="delete_robot">Delete</Button>
                    <Button class="ml-2" type="default" @click="close_del_popup">Cancel</Button>
                </div>
            </template>
        </Popup>
    </div>
</template>
<style scoped></style>