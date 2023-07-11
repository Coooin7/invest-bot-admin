<script setup lang="ts">
import Card from '@/components/futuristic/Card.vue';
import Button from '@/components/futuristic/Button.vue'
import Table from '@/components/futuristic/Table.vue';
import { format_bigint,readable_robot_name } from '@/utils/common'
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RobotService } from '@/servies/robot';
import { HttpCustomConfig } from '@/servies/http';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
const route = useRoute()
const router = useRouter()
const data = reactive({
    list: new Array<any>,
    loading: false
})
const rows = [
    {
        title: 'No',
        key: 'id',
    },
    {
        title: 'RobotName',
        key: 'userName',
    },
    {
        title: 'Market Value',
        key: 'amount',
    },
    {
        title: 'Operate',
        key: 'operate',
    }
]

function go_detail(record: any) {
    router.push('/robots/' + encodeURIComponent(record.userName))
}
function load_rank(loading:boolean=true) {
    HttpCustomConfig.loading = false
    data.loading = loading
    RobotService.portfolioRank().then(res => {
        data.list = res.data;
        data.loading = false;
        HttpCustomConfig.loading = true
    })
}
let timer = 0;
onMounted(() => {
    load_rank()
    clearInterval(timer);
    timer = setInterval(load_rank,20000,false);
})
onUnmounted(()=>{
    clearInterval(timer);
})
</script>
<template>
    <div class="py-6">
        <Card>
            <template #header>
                <p class="text-center font-bold">
                    <TextAnimate :text="route.meta.title?(route.meta.title as string):''"/>
                </p>
            </template>
            <template #body>
                <div class="min-h-[50vh]">
                    <Table :record-raw="rows" :data="data.list" :loading="data.loading">
                        <template #userName="{ record }">
                            <span>
                                {{ readable_robot_name(record.userName) }}
                            </span>
                        </template>
                        <template #amount="{ record }">
                            <span class="text-[#fd4343]">
                                {{ format_bigint(record.amount) }}
                            </span>
                            
                        </template>
                        <template #operate="{ record }">
                            <Button :loading="false" @click="go_detail(record)">detail</Button>
                        </template>
                    </Table>
                </div>
            </template>
        </Card>
    </div>
</template>
<style scoped></style>