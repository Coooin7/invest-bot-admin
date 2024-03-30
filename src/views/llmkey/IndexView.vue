<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Switch from '@/components/futuristic/form/Switch.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import Popup from '@/components/futuristic/Popup.vue';
import Select from '@/components/futuristic/form/Select.vue';
import { MessageBox } from '@/utils/message';
import { useThemeStore } from '@/stores/theme';
import { LlmKeyService } from '@/servies/llmkey';
const theme = useThemeStore();
const route = useRoute()
const Rows = [
    {
        title: 'ApiKey',
        key: 'apiKey',
    },
    {
        title: 'MaxDailyUses',
        key: 'maxDailyUses',
    },
    {
        title: 'Disabled',
        key: 'disabled',
    },
    {
        title: 'Reason',
        key: 'reason'
    },
    {
        title: 'Operate',
        key: 'operate',
    }
]
const SelectTypes = [
    {
        title: 'ALL',
        value: ''
    },
    {
        title: 'YES',
        value: 'True'
    },
    {
        title: 'NO',
        value: 'False'
    },
]
const data = reactive({
    list: new Array<any>,
    loading: false,
    query: {
        searchText: '',
        disabled: ''
    },
    queryPage: {
        page: 1,
        size: 20,
        totalPages: 0,
    },
    form: {
        apiKey: '',
        disabled: true,
        reason: '',
        maxDailyUses: 200,
        firstTime: 0,
        usageCount: 0
    },
    editId: '',
})
function load_data() {
    if (data.loading) {
        return
    }
    HttpCustomConfig.loading = false;
    data.loading = true;
    LlmKeyService.list(data.queryPage, { apiKey: data.query.searchText, disabled: data.query.disabled }).then(res => {
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
    popup.value.open();
}
const close_popup = () => {
    data.editId = '';
    data.form.apiKey = '';
    data.form.disabled = false
    data.form.reason = '';
    data.form.maxDailyUses = 200
    popup.value.close();
}
const edit = (item: llmKeyItem) => {
    data.editId = item.id ? item.id : '';
    data.form.apiKey = item.apiKey;
    data.form.reason = item.reason ? item.reason : '';
    data.form.disabled = item.disabled;
    data.form.maxDailyUses = item.maxDailyUses
    popup.value.open();
}
const delPopup = ref(Popup);
const del_popup = (id:string)=>{
    data.editId = id ? id : '';
    delPopup.value.open();
}
const close_del_popup = () => {
    data.editId = '';
    delPopup.value.close();
}
const del_data = () => {
    LlmKeyService.delete(data.editId).then(() => {
        close_del_popup();
        search();
    }).catch(() => {
        data.editId = '';
    })
}
const save_data = async () => {
    if (data.form.apiKey == '') {
        MessageBox.warning('ApiKey is not empty');
        return
    }
    try {
        if (data.editId) {
            await LlmKeyService.save({ id: data.editId, ...data.form });
        } else {
            await LlmKeyService.add({ ...data.form });
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
                        <Select class="w-40 mr-4" :data="SelectTypes" v-model="data.query.disabled" placeholder="TradeType"/>
                        <Button :loading="data.loading" @click="search">Search</Button>
                        <Button class="ml-2 type0" type="default" @click="add">Add</Button>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="card-body" :class="theme.themeScrollClassName">

                    <Table :record-raw="Rows" :data="data.list" :loading="data.loading">
                        <template #apiKey="{ record }">
                            <p class="w-40" v-tip="record.apiKey ? record.apiKey : '---'"></p>
                        </template>
                        <template #reason="{ record }">
                            <p class="w-40" v-tip="record.reason ? record.reason : '---'"></p>
                        </template>
                        <template #disabled="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ record.disabled ? 'YES' : 'NO' }}
                            </span>
                        </template>
                        <template #operate="{ record }">
                            <Button class="m-2" type="success" @click="edit(record)">Edit</Button>
                            <Button class="m-2" type="error" @click="del_popup(record.id)">Delete</Button>
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
                    <FormRowInput name="ApiKey" v-model="data.form.apiKey" placeholder="ApiKey" />
                    <FormRowInput name="MaxDailyUses" v-model="data.form.maxDailyUses" type="number" :min="0"
                        placeholder="MaxDailyUses" />
                    <Switch name="Disabled" v-model="data.form.disabled" />
                    <FormRowInput name="Reason" v-model="data.form.reason" type="textarea" :rows="3" placeholder="Reason" />
                </div>
                <div class="mt-4 text-right p-4">
                    <Button class="ml-2" type="success" @click="save_data">Save</Button>
                    <Button class="ml-2" type="default" @click="close_popup">Cancel</Button>
                </div>
            </template>
        </Popup>
        <Popup ref="delPopup">
            <template #header>
                <p class="p-4">
                    Delete The Item ?
                </p>
            </template>
            <template #body>
                <div class="mt-4 text-right p-4">
                    <Button type="error" @click="del_data">Delete</Button>
                    <Button class="ml-2" type="default" @click="close_del_popup">Cancel</Button>
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