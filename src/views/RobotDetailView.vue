<script setup lang="ts">
import { useRoute } from 'vue-router';
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import { onMounted, reactive } from 'vue';
import { format_bigint,format_date,readable_robot_name } from '@/utils/common'
import { RobotService,TradeType,type RoleInfo } from '@/servies/robot';
import { HttpCustomConfig } from '@/servies/http';
import { BigNumber } from '@ethersproject/bignumber';
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const route = useRoute()
const userName = decodeURIComponent(route.params.userName as string)
const data = reactive({
    details: new Array<any>,
    loading:false,
    history: new Array<any>,
    history_loading:false,
    amount:BigNumber.from(0),
    totalCost:BigNumber.from(0),
    totalProfit:BigNumber.from(0),
    profitMargin:'',
    role:{systemMessage:''} as RoleInfo
})
const detailsRows = [
    {
        title: 'Currency',
        key: 'coinId',
    },
    {
        title: 'Profit',
        key: 'profit',
    },
    {
        title: 'Quantity',
        key: 'quantity',
    },
    {
        title: 'CostPrice',
        key: 'costPrice',
    },
    {
        title: 'CurrentPrice',
        key: 'currentPrice'
    }
]
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
function load_details() {
    HttpCustomConfig.loading = false;
    data.loading = true;
    RobotService.portfolioProfit(userName).then(res => {
        data.details = res.data.portfolioDetailsVOList;
        data.totalCost = res.data.totalCost;
        data.totalProfit = res.data.totalProfit;
        HttpCustomConfig.loading = true;
        data.loading = false;
    })
}
function load_history() {
    HttpCustomConfig.loading = false;
    data.history_loading = true;
    RobotService.currencyHistoricalData({page:1,size:10},{userName}).then(res => {
        data.history = res.data.content;
        HttpCustomConfig.loading = true;
        data.history_loading = false;
    })
}
function get_total_amount(){
    HttpCustomConfig.loading = false;
    RobotService.getTotalAmount(userName,'usdt').then(res => {
        data.amount = res.data;
        HttpCustomConfig.loading = true;
    })
}
function load_role_info(){
    HttpCustomConfig.loading = false;
    RobotService.getRole(userName).then(res => {
        data.role = res.data;
        HttpCustomConfig.loading = true;
    })
}
onMounted(() => {
    load_history();
    load_details();
    get_total_amount();
    load_role_info();
})
</script>

<template>
    <div class="py-6 box">
        <Card>
            <template #header>
                <p class="text-center font-bold">
                    <TextAnimate :text="readable_robot_name(userName)"/>
                </p>
            </template>
            <template #body>
                <div class="min-h-[50vh]">
                    <div class="block-0 my-4">
                        <h2 class="text-[--theme-color-purple] text-center font-bold">Robot Details</h2>
                        <div class="flex my-4 flex-col">
                            <div class="text-center">
                                Remaining Assets :<span class="text-[#e43b3b] mx-4 font-bold">{{format_bigint(data.amount)}}</span>&nbsp;
                                Accumulated Profit :<span class="text-[#e43b3b] ml-4 font-bold">{{format_bigint(data.totalProfit)}}</span>
                                
                            </div>
                            <div class="overflow-y-auto max-h-[10em] text-[#d9d9d9] text-sm mt-4 px-2" :class="theme.themeScrollClassName">
                                {{ data.role.systemMessage }}
                            </div>
                        </div>
                    </div>
                    <div class="block-1 my-4">
                        <h2 class="text-[--theme-color-purple] text-center font-bold">Portfolio Details</h2>
                        <Table :record-raw="detailsRows" :data="data.details" :loading="data.loading">
                            <template #coinId="{record}">
                                <span class="pl-4">
                                    {{ record.coinId }}
                                </span>
                            </template>
                            <template #profit="{ record }">
                                <span v-if="record.profit > 0 && format_bigint(record.profit) != '0'" class="text-[#ff0000]">
                                    {{ format_bigint(record.profit) }}
                                </span>
                                <span
                                    v-else-if="record.profit < 0 && (record.profit !== null || record.profit !== undefined) && format_bigint(record.profit) != '0'"
                                    class="text-[#00ff00]">
                                    {{ format_bigint(record.profit) }}
                                </span>
                                <span v-else class="text-[#8d8d8d]">
                                    {{ format_bigint(record.profit) }}
                                </span>
                            </template>
                            <template #quantity="{ record }">
                                {{ format_bigint(record.quantity) }}
                            </template>
                            <template #costPrice="{ record }">
                                {{ format_bigint(record.costPrice) }}
                            </template>
                            <template #currentPrice="{ record }">
                                {{ format_bigint(record.currentPrice) }}
                            </template>
                        </Table>
                    </div>
                    <div class="block-2 my-4">
                        <h2 class="text-[--theme-color-purple] text-center font-bold">Recent operation</h2>
                        <Table :record-raw="historyRows" :data="data.history" :loading="data.history_loading">
                            <template #coinId="{record}">
                                <span class="pl-4">
                                    {{ record.coinId }}
                                </span>
                            </template>
                            <template #tradeType="{ record }">
                                <span :class="{'text-red-600':record.tradeType==TradeType.BUY,'text-[#36bd36]':record.tradeType==TradeType.SELL}">
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
                                    {{ record.tradeReason?record.tradeReason:'---'}}
                                </p>
                            </template>
                            <template #createdTime="{ record }">
                                <span class="text-[#bbbbbb]">
                                    {{ format_date(record.createdTime) }}
                                </span>
                            </template>
                        </Table>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
<style scoped>
</style>