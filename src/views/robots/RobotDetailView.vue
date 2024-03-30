<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import { onMounted, reactive } from 'vue';
import { format_bigint, format_date, readable_robot_name } from '@/utils/common'
import { RobotService, TradeType, type RoleInfo } from '@/servies/robot';
import { HttpCustomConfig } from '@/servies/http';
import { BigNumber, FixedNumber } from '@ethersproject/bignumber';
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const route = useRoute()
const router = useRouter()
const userName = decodeURIComponent(route.params.userName as string)
const data = reactive({
    details: new Array<any>,
    loading: false,
    history: new Array<any>,
    history_loading: false,
    coinCount: '0',
    totalCost: '0',
    costPrice: '0',
    totalProfit: '0',
    profitMargin: '',
    role: { systemMessage: '' } as RoleInfo,
    showDetails: false,
})
const detailsRows = [
    {
        title: 'Symbol',
        key: 'coinId',
    },
    {
        title: 'Open Interest',
        key: 'coinCount',
    },
    {
        title: 'costAmount',
        key: 'costAmount',
    },
    {
        title: 'soldAmount',
        key: 'soldAmount',
    },
    {
        title: 'CurrentPrice',
        key: 'currentPrice'
    },
    {
        title: 'Unrealized Profit/Loss',
        key: 'profit',
    }
]
const historyRows = [
    {
        title: 'Symbol',
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
function load_details() {
    HttpCustomConfig.loading = false;
    data.loading = true;
    RobotService.portfolioProfit(userName).then(res => {
        data.details = res.data.portfolioDetailsVoList;
        data.totalCost = res.data.totalCost;
        data.totalProfit = res.data.totalProfit;
        HttpCustomConfig.loading = true;
        data.loading = false;
    })
}
function load_history() {
    HttpCustomConfig.loading = false;
    data.history_loading = true;
    RobotService.currencyHistoricalData({ page: 1, size: 10 }, { userName }).then(res => {
        data.history = res.data.content;
        HttpCustomConfig.loading = true;
        data.history_loading = false;
    })
}
function get_total_amount() {
    HttpCustomConfig.loading = false;
    RobotService.getTotalAmount(userName, 'usdt').then(res => {
        data.coinCount = res.data?.coinCount;
        data.costPrice = res.data?.costPrice;
        HttpCustomConfig.loading = true;
    })
}

function load_role_info() {
    HttpCustomConfig.loading = false;
    RobotService.getRole(userName).then(res => {
        data.role = res.data;
        HttpCustomConfig.loading = true;
    })
}
function navBack() {
    router.back();
}
onMounted(() => {
    load_history();
    load_details();
    get_total_amount();
    load_role_info();
})
</script>

<template>
    <div>
        <Card margin="0 2.5rem" padding="1rem 0">
            <template #header>
                <div class="flex justify-between text-white">
                    <p>
                        <span class="font-bold">{{ readable_robot_name(userName) }}</span>
                        <span class="text-[1rem] ml-4">{{ data.role.desc }}</span>
                    </p>
                    <div class="flex items-center text-[1rem] gap-4">
                        <p class="flex items-center cursor-pointer gap-1" @click="data.showDetails = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17 7L20 7" stroke="white" stroke-width="1.5" />
                                <path d="M7.5 10L7.5 13" stroke="white" stroke-width="1.5" />
                                <path d="M11 10L11 13" stroke="white" stroke-width="1.5" />
                                <path d="M17 12L20 12" stroke="white" stroke-width="1.5" />
                                <path d="M12 17L20 17" stroke="white" stroke-width="1.5" />
                                <path
                                    d="M10.3636 19H6C4.89543 19 4 18.1046 4 17V9C4 7.89543 4.89543 7 6 7H12C13.1046 7 14 7.89543 14 9V13"
                                    stroke="white" stroke-width="1.5" />
                            </svg>
                            <span>Details</span>
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="12" viewBox="0 0 2 12" fill="none">
                            <path d="M1 0L1 12" stroke="#364454" stroke-width="1.5" />
                        </svg>
                        <p class="flex items-center cursor-pointer gap-1" @click="navBack">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M7 7H14.171C16.838 7 19 9.16204 19 11.829V11.829C19 14.4961 16.838 16.6581 14.171 16.6581H7M7 16.6581L10.1746 13.3162M7 16.6581L10.1746 20"
                                    stroke="white" stroke-width="1.5" />
                            </svg>
                            <span>Back</span>
                        </p>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="card-body" :class="theme.themeScrollClassName">
                    <div class="block-0 flex my-4 flex-row justify-between text-center">
                        <div class="w-[31%] rounded-lg bg-[#6786d71f] flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <span class="font-bold w-40 text-2xl" v-tip="format_bigint(data.totalCost)"></span>
                                <p class="mt-1 text-[#AEC3DC]">Capital</p>
                            </div>
                        </div>
                        <div class="w-[31%] rounded-lg bg-[#2cb1811f] flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <span class="font-bold w-40 text-2xl" v-tip="format_bigint(data.coinCount)"></span>
                                <p class="mt-1 text-[#AEC3DC]">Valuation of assets</p>
                            </div>
                        </div>
                        <div class="w-[31%] rounded-lg bg-[#ffa7221f] flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <span class="font-bold w-40 text-2xl" v-tip="format_bigint(data.totalProfit)"></span>
                                <p class="mt-1 text-[#AEC3DC]">Revenue</p>
                            </div>
                        </div>

                    </div>
                    <div class="block-1 my-4">
                        <h2 class="text-left text-xl font-bold">Portfolio Details</h2>
                        <Table :record-raw="detailsRows" :data="data.details" :loading="data.loading">
                            <template #coinId="{ record }">
                                <span>
                                    {{ record.coinId }}
                                </span>
                            </template>
                            <template #profit="{ record }">
                                <span class="w-20" v-tip="format_bigint(record.profit)"></span>
                            </template>
                            <template #coinCount="{ record }">
                                <span class="w-20" v-tip="format_bigint(record.coinCount)"></span>
                            </template>
                            <template #costAmount="{ record }">
                                <span class="w-20" v-tip="format_bigint(record.costAmount)"></span>
                            </template>
                            <template #soldAmount="{ record }">
                                <span class="w-20" v-tip="format_bigint(record.soldAmount)"></span>
                            </template>
                            <template #currentPrice="{ record }">
                                <span class="w-20" v-tip="format_bigint(record.currentPrice)"></span>
                            </template>
                        </Table>
                    </div>
                    <div class="block-2 my-4">
                        <h2 class="text-left text-xl font-bold">Recent Operation</h2>
                        <Table :record-raw="historyRows" :data="data.history" :loading="data.history_loading">
                            <template #coinId="{ record }">
                                <span>
                                    {{ record.coinId }}
                                </span>
                            </template>
                            <template #tradeType="{ record }">
                                <span
                                    :class="{ 'text-red-600': record.tradeType == TradeType.BUY, 'text-[#36bd36]': record.tradeType == TradeType.SELL }">
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
                    </div>
                </div>
            </template>
        </Card>
        <div class="detail-card fixed right-0 top-0 h-screen flex items-center justify-end"
            :style="{ display: data.showDetails ? 'flex' : 'none' }">
            <Card class="detail-card-content w-[30vw] mr-10" :style="{ transform: data.showDetails ? 'translateX(0)' : 'translateX(200%)' }">
                <template #header>
                    <p class="flex justify-between items-center p-8">
                        <span>Robot Details</span>
                    <p class="flex items-center cursor-pointer text-[1rem]" @click="data.showDetails = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M7 7H14.171C16.838 7 19 9.16204 19 11.829V11.829C19 14.4961 16.838 16.6581 14.171 16.6581H7M7 16.6581L10.1746 13.3162M7 16.6581L10.1746 20"
                                stroke="white" stroke-width="1.5" />
                        </svg>
                        <span>Back</span>
                    </p>
                    </p>
                </template>
                <template #body>
                    <div class="detail-card-body p-8" :class="theme.themeScrollClassName">
                        {{ data.role.systemMessage }}
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
<style scoped>
.card-body {
    height: calc(100vh - 17.5rem);
    overflow-y: auto;
}

.block-0>div {
    aspect-ratio: 19/8;
}

.detail-card {
    display: none;
    transition: all 600ms;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
}
.detail-card-content{
    transition: all 600ms;
}
.detail-card-body {
    height: calc(100vh - 11rem);
    overflow-y: auto;
}
</style>