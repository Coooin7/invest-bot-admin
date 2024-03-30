<script setup lang="ts">
import { useThemeStore, } from '@/stores/theme';
const theme = useThemeStore();
interface SelectDataItem {
    title: string,
    value: string,
}
const props = defineProps({
    modelValue: String,
    placeholder: String,
    name: String,
    data: Array<SelectDataItem>,
})
const emit = defineEmits(['update:modelValue', 'change']);
const choose_item = (val: SelectDataItem) => {
    emit('update:modelValue', val.value);
    emit('change', val.value);
}
const get_title = () => {
    if (!props.data) {
        return 'ALL';
    }
    for (const opt of props.data) {
        if (opt.value === props.modelValue) {
            return opt.title;
        }
    }
    return 'ALL';
}
</script>
<template>
    <div class="inline-block" :class="theme.createThemeClassName()">
        <label v-if="name" class="text-muted select-none">{{ name }}</label>
        <div class="select relative">
            <div class="value form-control text-ellipsis overflow-hidden">
                <div class="pr-2">
                    {{ get_title() }}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon w-4 h-4" width="14" height="14">
                    <path stroke-width="2" stroke="#fff" d="M 0,12 L 8,4 L 16,12" />
                </svg>
            </div>
            <div class="option min-w-[100%] absolute left-0 top-[100%] z-50 max-h-40 overflow-y-auto"
                :class="theme.themeScrollClassName">
                <div class="option-item p-2" v-for="(o, i) in props.data" :key="i" @click="choose_item(o)">
                    {{ o.title }}
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.select .icon {
    transform: rotateZ(180deg);
    transition: all 300ms;
}

.select:hover .icon {
    transform: rotateZ(0deg);
}

.option {
    background: rgba(35, 58, 87, 1);
    user-select: none;
    color: #ffffff;
    z-index: 1001;
    transform: scaleY(0);
    transition: all 300ms;
    transform-origin: 0% 0%;
}

.select .value {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.select .value>div {
    width: calc(100% - 1rem);
}

.select:hover .option {
    transform: scaleY(1);
    font-size: 1rem;
}

.form-control {
    padding: 8px;
    font-size: 1rem;
    outline: none;
    background: rgba(35, 58, 87, 0.71);
    color: #fff;
    line-height: normal;
    border-radius: 0.5rem;
}

/**color0 */
.type0 .text-muted {
    color: #be26fc;
}

.type0 .form-control {
    border: #be26fc 1px solid;
}

.type0 .option {
    border: #be26fc 1px solid;
}

.type0 .option-item:hover {
    color: #be26fc;
}

/**color1 */
.type1 .text-muted {
    color: #26fc5c;
}

.type1 .form-control {
    border: #26fc5c 1px solid;
}

.type1 .option {
    border: #26fc5c 1px solid;
}

.type1 .option-item:hover {
    color: #26fc5c;
}

/**color2 */
.type2 .text-muted {
    color: #fc2626;
}

.type2 .form-control {
    border: #fc2626 1px solid;
}

.type2 .option-item:hover {
    color: #fc2626;
}

/**color3 */
.type3 .text-muted {
    color: #fff;
}

.type3 .form-control {
    border: transparent 1px solid;
}

.type3 .option {
    border: transparent 1px solid;
    color: #70aad1;
}

.type3 .option-item:hover {
    font-weight: bold;
    background: linear-gradient(90deg, #1e587f 0%, transparent 100%);
}</style>