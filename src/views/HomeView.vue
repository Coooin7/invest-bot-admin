<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Table from '@/components/futuristic/Table.vue';
import { format_bigint, readable_robot_name } from '@/utils/common'
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { RobotService } from '@/servies/robot';
import { HttpCustomConfig } from '@/servies/http';
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const route = useRoute();
const router = useRouter();
const data = reactive({
    list: new Array<any>(),
    loading: false
})
const rows = [
    {
        title: 'No.',
        key: 'id',
    },
    {
        title: 'Robot Name',
        key: 'userName',
    },
    {
        title: 'Market Value',
        key: 'amount',
    }
]

function load_rank(loading: boolean = true) {
    HttpCustomConfig.loading = false
    data.loading = loading
    RobotService.portfolioRank().then(res => {
        data.list = res.data;
        data.loading = false;
        HttpCustomConfig.loading = true
    })
}
function nav_to_detail(d: PortfolioRank) {
    
    router.push('/robots/' + encodeURIComponent(d.userName));
}
let timer: any;
onMounted(() => {
    load_rank();
    clearInterval(timer);
    timer = setInterval(load_rank, 20000, false);
})
onUnmounted(() => {
    clearInterval(timer);
})
</script>
<template>
    <Card :class="theme.themeScrollClassName" margin="0 2.5rem" padding="1rem 0">
        <template #header>
            <p class="text-left font-bold text-white">
                {{ route.meta.title ? (route.meta.title as string) : '' }}
            </p>
        </template>
        <template #body>
            <div class="card-body" :class="theme.themeScrollClassName">
                <Table :record-raw="rows" :data="data.list" :loading="data.loading" row-cursor="pointer" @click-row="nav_to_detail">
                    <template #userName="{ record }">
                        <span class=" cursor-default">{{ readable_robot_name(record.userName) }}</span>
                    </template>
                    <template #amount="{ record }">
                        <span class=" cursor-default">
                            {{ format_bigint(record.amount) }}
                        </span>

                    </template>
                </Table>
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