<script setup lang="ts">
import { format_bigint } from "@/utils/common";
import { BigNumber } from "@ethersproject/bignumber"
import LoadingIcon from '@/components/futuristic/LoadingIcon.vue'
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
interface TableRecord {
    title: string,
    key: string
}
const data = defineProps({
    data: Array<any>,
    recordRaw: Array<TableRecord>,
    loading: Boolean,
    rowCursor:String,
})
function format_number(val: any) {
    if (BigNumber.isBigNumber(val)) {
        return format_bigint(val)
    } else {
        return val
    }
}
const slot = defineSlots();
const emits = defineEmits(['clickRow', 'clickCol']);
</script>
<template>
    <table class="table w-full my-4" :class="theme.createThemeClassName()" :border="0">
        <thead class="theader sticky top-0 z-50 text-[#AEC3DC]">
            <tr class="border-b-[#364454] border-b-[2px]">
                <th class=" px-4 py-4" v-for="(r, i) in data.recordRaw" :key="i">{{ r.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(d, i) in data.data" :key="i" class="tbody text-center border-b border-b-[#364454]" :style="{cursor:rowCursor}"
                @click="emits('clickRow', d)">
                <td v-for="(r, ii) in data.recordRaw" :key="ii" class="py-10 max-w-[20em] px-4"
                    @click.self="emits('clickCol', d[r.key])">
                    <template v-if="typeof d[r.key] === 'undefined' && !slot[r.key]">
                        <span v-if="r.key === 'id'">{{ i + 1 }}</span>
                        <span v-else class="text-red">wrong key [{{ r.key }}]</span>
                    </template>
                    <template v-else>
                        <template v-if="!slot[r.key]">
                            {{ format_number(d[r.key]) }}
                        </template>
                        <slot :name="r.key" :record="d" />
                    </template>
                </td>
            </tr>
            <tr class="font-bold" v-if="data.loading">
                <td :colspan="data.recordRaw?.length">
                    <LoadingIcon />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
.tbody {
    transition: all 300ms;
    text-align: left;
    color: #ffffffe8;
}

.theader th {
    font-weight: bold;
    text-align: left;
}

.tbody:last-child {
    border-bottom: none;
}

.type0 .tbody:hover {
    background: rgba(56, 8, 55, 0.603);

}

.type1 .tbody:hover {
    background: rgba(14, 34, 3, 0.65);
}

.type3 .theader th {
    background: #051626;
}

.type2 .tbody:hover {
    background: rgba(34, 3, 3, 0.65);
}

.type3 .tbody:hover {
    background: rgba(255, 255, 255, 0.05);
}</style>