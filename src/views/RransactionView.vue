<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { RobotService, TradeType, type RoleInfo } from '@/servies/robot';
import { format_bigint, format_date, readable_robot_name } from '@/utils/common'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Select from '@/components/futuristic/form/Select.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import { useThemeStore } from '@/stores/theme';
const route = useRoute()
const theme = useThemeStore();
const historyRows = [
    {
        title: 'Robot Name',
        key: 'userName',
    },
    {
        title: 'Currency',
        key: 'coinId',
    },
    {
        title: 'Trade Type',
        key: 'tradeType',
    },
    {
        title: 'Quantity',
        key: 'tradeNumber',
    },
    {
        title: 'Price',
        key: 'tradePrice',
    },
    {
        title: 'Trade Amount',
        key: 'amount'
    },
    {
        title: 'Trade Reason',
        key: 'tradeReason',
    },
    {
        title: 'Date',
        key: 'createdTime'
    }
]
const TradeTypes = [
    {
        title: 'ALL',
        value: ''
    },
    {
        title: 'BUY',
        value: 'BUY'
    },
    {
        title: 'SELL',
        value: 'SELL'
    },
    {
        title: 'DEPOSIT',
        value: 'DEPOSIT'
    },
    {
        title: 'DRAW',
        value: 'DRAW'
    },
]
const data = reactive({
    history: new Array<any>,
    history_loading: false,
    query: {
        userName: '',
        tradeType: TradeType.ALL,
        coinId: '',
    },
    queryPage: {
        page: 1,
        size: 20,
        totalPages: 0,
    }
})
function load_history() {
    if (data.history_loading) {
        return
    }
    HttpCustomConfig.loading = false;
    data.history_loading = true;
    RobotService.currencyHistoricalData(data.queryPage, data.query).then(res => {
        data.history = data.history.concat(res.data.content);
        data.queryPage.totalPages = res.data.totalPages;
        HttpCustomConfig.loading = true;
        data.history_loading = false;
    })
}
function search() {
    data.history = [];
    data.queryPage.page = 1;
    load_history();
}
function next_page() {
    if (data.queryPage.page < data.queryPage.totalPages) {
        data.queryPage.page += 1;
        load_history();
    }
}
onMounted(() => {
    load_history();
})
</script>
<template>
    <Card margin="0 2.5rem" padding="1rem 0">
        <template #header>
            <div class="flex justify-between">
                <p class="text-center font-bold text-white">
                    {{ route.meta.title ? (route.meta.title as string) : '' }}
                </p>
                <div class="flex items-center">
                    <FormRowInput v-model="data.query.userName" class="inline-block mr-4" type="text"
                        placeholder="Robot Name" @change="search" />
                    <FormRowInput v-model="data.query.coinId" class="inline-block mr-4" type="text" placeholder="Coin Name"
                        @change="search" />
                    <Select class="w-40" :data="TradeTypes" v-model="data.query.tradeType" placeholder="TradeType"
                        @change="search" />
                </div>
            </div>
        </template>
        <template #body>
            <div class="card-body" :class="theme.themeScrollClassName">

                <Table :record-raw="historyRows" :data="data.history" :loading="data.history_loading">
                    <template #userName="{ record }">
                        {{ readable_robot_name(record.userName) }}
                    </template>
                    <template #coinId="{ record }">
                        <span>
                            {{ record.coinId }}
                        </span>

                    </template>
                    <template #tradeType="{ record }">
                        <span
                            :class="{ 'text-red-600': record.tradeType == TradeType.BUY, 'text-[#36bd36]': record.tradeType == TradeType.SELL, 'text-[#009688]': record.tradeType == TradeType.DEPOSIT, 'text-[#FF9800]': record.tradeType == TradeType.DRAW }">
                            {{ record.tradeType }}
                        </span>
                    </template>
                    <template #tradeNumber="{ record }">
                        <span class="w-20" v-tip="format_bigint(record.tradeNumber)"></span>
                    </template>
                    <template #tradePrice="{ record }">
                        <span class="w-20" v-tip="format_bigint(record.tradePrice)"></span>
                    </template>
                    <template #amount="{ record }">
                        <span class="w-20" v-tip="format_bigint(record.amount)"></span>
                    </template>
                    <template #tradeReason="{ record }">
                        <p class="w-40" v-tip="record.tradeReason ? record.tradeReason : '---'"></p>
                    </template>
                    <template #createdTime="{ record }">
                        <span class="text-[#bbbbbb]">
                            {{ format_date(record.createdTime) }}
                        </span>
                    </template>
                </Table>
                <div v-if="data.queryPage.page < data.queryPage.totalPages - 1 && !data.history_loading"
                    class="text-center">
                    <Button @click="next_page">More</Button>
                </div>
            </div>
        </template>
    </Card>
</template>
<style scoped>
.card-body {
    height: calc(100vh - 17.5rem);
    overflow-y: auto;
}
</style>