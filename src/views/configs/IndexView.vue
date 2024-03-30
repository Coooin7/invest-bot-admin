<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { RobotService, TradeType, type RoleInfo, RoleType } from '@/servies/robot';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Switch from '@/components/futuristic/form/Switch.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import Popup from '@/components/futuristic/Popup.vue';
import { MessageBox } from '@/utils/message';
import { useThemeStore } from '@/stores/theme';
import { ConfigService } from '@/servies/sys-configs';
const theme = useThemeStore();
const route = useRoute()
const router = useRouter()
const Rows = [
    {
        title: 'Key',
        key: 'key',
    },
    {
        title: 'Value',
        key: 'value',
    },
    {
        title: 'Disabled',
        key: 'disabled',
    },
    {
        title: 'Remark',
        key: 'remark'
    },
    {
        title: 'Operate',
        key: 'operate',
    }
]

const data = reactive({
    list: new Array<any>,
    loading: false,
    query: {
        searchText: ''
    },
    queryPage: {
        page: 1,
        size: 20,
        totalPages: 0,
    },
    form: {
        value: '',
        disabled: true,
        remark: '',
    },
    editId: '',
})
function load_data() {
    if (data.loading) {
        return
    }
    HttpCustomConfig.loading = false;
    data.loading = true;
    ConfigService.list(data.queryPage, { key: data.query.searchText }).then(res => {
        data.list = data.list.concat(res.data.content);
        data.queryPage.totalPages = res.data.totalPages;
        HttpCustomConfig.loading = true;
        data.loading = false;
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
    data.form.value = '';
    data.form.disabled = false
    data.form.remark = '';
    popup.value.open();
}
const close_popup = () => {
    data.editId = '';
    data.form.value = '';
    data.form.disabled = false
    data.form.remark = '';
    popup.value.close();
}
const edit = (item: ConfigItem) => {
    data.editId = item.id ? item.id : '';
    data.form.value = item.value;
    data.form.remark = item.remark;
    data.form.disabled = item.disabled;
    popup.value.open();
}
const save_data = async () => {
    if (data.form.value == '') {
        MessageBox.warning('Value is not empty');
        return
    }
    try {
        if (data.editId) {
            await ConfigService.save({ id: data.editId, ...data.form });
        } else {
            //
        }
        close_popup();
        search();
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    load_data();
})
</script>
<template>
    <div>
        <Card margin="0 2.5rem" padding="1rem 0">
            <template #header>
                <div class="flex justify-between items-center">
                    <p class="text-left">
                        <TextAnimate :text="route.meta.title ? (route.meta.title as string) : ''" />
                    </p>
                    <div class="flex items-center">
                        <FormRowInput v-model="data.query.searchText" class="inline-block mr-4" type="text"
                            placeholder="key" />
                        <Button :loading="data.loading" @click="search">Search</Button>
                        <!-- <Button class="ml-2 type0" type="default" @click="add">Add</Button> -->
                    </div>
                </div>
            </template>
            <template #body>
                <div class="card-body" :class="theme.themeScrollClassName">

                    <Table :record-raw="Rows" :data="data.list" :loading="data.loading">
                        <template #value="{ record }">
                            <p class="w-40" v-tip="record.value ? record.value : '---'"></p>
                        </template>
                        <template #remark="{ record }">
                            <p class="w-40" v-tip="record.remark ? record.remark : '---'"></p>
                        </template>
                        <template #disabled="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ record.disabled ? 'YES' : 'NO' }}
                            </span>
                        </template>
                        <template #operate="{ record }">
                            <Button class="m-2" type="success" @click="edit(record)">Edit</Button>
                            <!-- <Button class="m-2" type="error" @click="del_robot(record)">Delete</Button> -->
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
                <p class="py-4">
                    {{ data.editId ? 'Edit' : 'Add' }} Robot
                </p>
            </template>
            <template #body>
                <div class="p-4 flex flex-col gap-2">
                    <FormRowInput name="Remark" v-model="data.form.remark" placeholder="Remark" />
                    <Switch name="Disabled" v-model="data.form.disabled" />
                    <FormRowInput name="Value" v-model="data.form.value" type="textarea" :rows="8" placeholder="Value" />
                </div>
                <div class="mt-4 text-right p-4">
                    <Button class="ml-2" type="success" @click="save_data">Save</Button>
                    <Button class="ml-2" type="default" @click="close_popup">Cancel</Button>
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
</style>