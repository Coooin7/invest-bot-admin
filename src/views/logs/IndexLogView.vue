<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { AgentLogs } from '@/servies/logs';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import Popup from '@/components/futuristic/Popup.vue';
import Select from '@/components/futuristic/form/Select.vue';
import { useThemeStore } from '@/stores/theme';
import { format_date } from '@/utils/common'
const theme = useThemeStore();
const route = useRoute()
const Rows = [
    {
        title: 'ChainId',
        key: 'chainId'
    },
    {
        title: 'UserName',
        key: 'userName',
    },
    {
        title: 'Input',
        key: 'input',
    },
    {
        title: 'Output',
        key: 'output'
    },
    {
        title: 'Action',
        key: 'action'
    },
    {
        title: 'CreatedTime',
        key: 'createdTime'
    }
]
const date = new Date();

const data = reactive({
    list: new Array<any>,
    loading: false,
    query: {
        chainId: '',
        userName: '',
        startTime: '',
        endTime: '',
    },
    queryPage: {
        page: 1,
        size: 20,
        totalPages: 0,
    },
    export: false,
    showPicker: false,
    datePicker: {
        y: '',
        m: '',
        d: '',
        h: '',
        i: '',
        start: true,
    }
})
const load_data = () => {
    if (data.loading) {
        return
    }
    HttpCustomConfig.loading = false;
    data.loading = true;
    AgentLogs.search(data.queryPage, data.query).then(res => {
        data.list = data.list.concat(res.data.content);
        data.queryPage.totalPages = res.data.totalPages;
        HttpCustomConfig.loading = true;
        data.loading = false;
    })
}
const search = () => {
    data.list = [];
    data.queryPage.page = 1;
    load_data();
}
const next_page = () => {
    if (data.queryPage.page < data.queryPage.totalPages) {
        data.queryPage.page += 1;
        load_data();
    }
}

const export_data = async () => {
    AgentLogs.export(data.query)
}
const popup = ref(Popup)

const close_picker = () => {
    popup.value?.close()
}
const init_picker = () => {
    data.datePicker.y = date.getFullYear().toString();
    data.datePicker.m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : ('0' + (date.getMonth() + 1))
    data.datePicker.d = date.getDate() > 9 ? date.getDate().toString() : ('0' + date.getDate())
    data.datePicker.h = date.getHours() > 9 ? date.getHours().toString() : ('0' + date.getHours())
    data.datePicker.i = date.getMinutes() > 9 ? date.getMinutes().toString() : ('0' + date.getMinutes())
}
const picker_show = (start = true) => {
    init_picker();
    data.datePicker.start = start;
    popup.value?.open();
}
const picker_change = () => {
    close_picker();
    if (data.datePicker.start) {
        data.query.startTime = `${data.datePicker.y}-${data.datePicker.m}-${data.datePicker.d} ${data.datePicker.h}:${data.datePicker.i}`;
    } else {
        data.query.endTime = `${data.datePicker.y}-${data.datePicker.m}-${data.datePicker.d} ${data.datePicker.h}:${data.datePicker.i}`;
    }
}
const get_years = () => {
    const date = new Date();
    const y = date.getFullYear();
    const ar = [];
    for (let i = y; i > y - 10; i--) {
        ar.push({
            title: i.toString(),
            value: i.toString()
        })
    }
    return ar
}
const get_monmths = () => {
    const ar = [];
    for (let i = 12; i > 0; i--) {
        ar.push({
            title: i > 9 ? i.toString() : ('0' + i),
            value: i > 9 ? i.toString() : ('0' + i)
        })
    }
    return ar
}
const get_days = () => {
    const ar = [];
    for (let i = 31; i > 0; i--) {
        ar.push({
            title: i > 9 ? i.toString() : ('0' + i),
            value: i > 9 ? i.toString() : ('0' + i)
        })
    }
    return ar
}
const get_hours = () => {
    const ar = [];
    for (let i = 24; i > 0; i--) {
        ar.push({
            title: i > 9 ? i.toString() : ('0' + i),
            value: i > 9 ? i.toString() : ('0' + i)
        })
    }
    return ar
}
const get_minutes = () => {
    const ar = [];
    for (let i = 59; i > 0; i--) {
        ar.push({
            title: i > 9 ? i.toString() : ('0' + i),
            value: i > 9 ? i.toString() : ('0' + i)
        })
    }
    return ar
}
onMounted(() => {
    init_picker();
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
                        <FormRowInput v-model="data.query.userName" class="inline-block mr-4" type="text"
                            placeholder="userName" />
                        <FormRowInput v-model="data.query.startTime" class="inline-block mr-4" type="text"
                            placeholder="startTime" @focus="picker_show(true)" />
                        <FormRowInput v-model="data.query.endTime" class="inline-block mr-4" type="text"
                            placeholder="endTime" @focus="picker_show(false)" />
                        <Button :loading="data.loading" @click="search">Search</Button>
                        <Button class="ml-2 type0" type="success" :loading="data.export"
                            @click="export_data">Export</Button>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="card-body" :class="theme.themeScrollClassName">
                    <Table :record-raw="Rows" :data="data.list" :loading="data.loading">
                        <template #chainId="{ record }">
                            <p class="w-40" v-tip="record.chainId ? record.chainId : '---'"></p>
                        </template>
                        <template #input="{ record }">
                            <p class="w-40" v-tip="record.input ? record.input : '---'"></p>
                        </template>
                        <template #output="{ record }">
                            <p class="w-40" v-tip="record.output ? record.output : '---'"></p>
                        </template>
                        <template #action="{ record }">
                            <p class="w-40" v-tip="record.action ? record.action : '---'"></p>
                        </template>
                        <template #createdTime="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ format_date(record.createdTime) }}
                            </span>
                        </template>
                    </Table>
                    <div v-if="data.queryPage.page < data.queryPage.totalPages - 1 && !data.loading" class="text-center">
                        <Button @click="next_page">More</Button>
                    </div>
                </div>

            </template>
        </Card>
        <Popup ref="popup">
            <template #header>
                <p class="px-2">
                    Select Date
                </p>
            </template>
            <template #body>
                <div class="h-44 p-4">
                    <Select v-model="data.datePicker.y" :data="get_years()" /> &nbsp;
                    <Select v-model="data.datePicker.m" :data="get_monmths()" /> &nbsp;
                    <Select v-model="data.datePicker.d" :data="get_days()" /> &nbsp;
                    <Select class="ml-4" v-model="data.datePicker.h" :data="get_hours()" /> &nbsp;
                    <Select v-model="data.datePicker.i" :data="get_minutes()" />
                </div>
                <div class="text-right mt-8 p-4">
                    <Button class="mr-4" @click="picker_change">Ok</Button>
                    <Button @click="close_picker">Cancel</Button>
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