<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import Button from '@/components/futuristic/Button.vue';
import FormRowInput from '@/components/futuristic/form/FormRowInput.vue';
import { HttpCustomConfig } from '@/servies/http';
import { RobotService, TradeType, type RoleInfo } from '@/servies/robot';
import { format_bigint, format_date } from '@/utils/common'
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Select from '@/components/futuristic/form/Select.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
const route = useRoute()
const historyRows = [
    {
        title: 'Currency',
        key: 'coinId',
    },
    {
        title: 'TradeType',
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
        title: 'TradeReason',
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
        page: 0,
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
    data.queryPage.page = 0;
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
                        <FormRowInput v-model="data.query.userName" class="inline-block mr-4" type="text"
                            placeholder="Robot Name" />
                        <FormRowInput v-model="data.query.coinId" class="inline-block mr-4" type="text"
                            placeholder="Coin Name" />
                        <Select class="mr-4 w-24" :data="TradeTypes" v-model="data.query.tradeType"
                            placeholder="TradeType" />
                        <Button :loading="data.history_loading" @click="search">search</Button>
                    </div>
                    <Table :record-raw="historyRows" :data="data.history" :loading="data.history_loading">
                        <template #coinId="{ record }">
                            <span class="pl-4">
                                {{ format_bigint(record.coinId) }}
                            </span>

                        </template>
                        <template #tradeType="{ record }">
                            <span
                                :class="{ 'text-red-600': record.tradeType == TradeType.BUY, 'text-[#36bd36]': record.tradeType == TradeType.SELL }">
                                {{ record.tradeType }}
                            </span>
                        </template>
                        <template #tradeNumber="{ record }">
                            {{ format_bigint(record.tradeNumber) }}
                        </template>
                        <template #tradePrice="{ record }">
                            {{ format_bigint(record.tradePrice) }}
                        </template>
                        <template #tradeReason="{ record }">
                            <p class="text-[#009688] px-2">
                                {{ record.tradeReason ? record.tradeReason : '---' }}
                            </p>
                        </template>
                        <template #createdTime="{ record }">
                            <span class="text-[#bbbbbb]">
                                {{ format_date(record.createdTime) }}
                            </span>
                        </template>
                    </Table>
                </div>

                <div v-if="data.queryPage.page < data.queryPage.totalPages - 1 && !data.history_loading" class="text-center">
                    <Button @click="next_page">More</Button>
                </div>
            </template>
        </Card>
    </div>
</template>
<style scoped></style>