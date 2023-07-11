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
const emit = defineEmits(['update:modelValue']);
const choose_item = (val: SelectDataItem) => {
    emit('update:modelValue', val.value);
}
</script>
<template>
    <div class="inline-block" :class="theme.createThemeClassName()">
        <label v-if="name" class="text-muted select-none">{{ name }}</label>
        <div class="select relative">
            <div class="value form-control text-ellipsis overflow-hidden">
                <div>
                    {{ props.modelValue ? props.modelValue : 'ALL' }}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon w-4 h-4" width="14" height="14">
                    <path stroke-width="2" stroke="#fff" d="M 0,12 L 8,4 L 16,12" />
                </svg>
            </div>
            <div class="option min-w-[100%] absolute left-0 top-[100%] z-50">
                <div class="option-item" v-for="(o, i) in props.data" :key="i" @click="choose_item(o)">
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
    padding: 1em;
    background: rgba(0, 0, 0, 0.849);
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
}

.form-control {
    padding: 8px;
    font-size: 1.2rem;
    font-family: "VT323", monospace;
    outline: none;
    background: rgba(0, 0, 0, 0.589);
    color: #00e7ff;
    line-height: normal;
}

.form-control option {
    color: #ffffff;
    background: rgba(0, 0, 0, 0.589);
    appearance: none;
}

.form-control option:hover {
    background: rgba(255, 71, 71, 0.589);
    font-weight: bold;
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
    color: #39e0ff;
}

.type3 .form-control {
    border: #39e0ff 1px solid;
}

.type3 .option {
    border: #39e0ff 1px solid;
}

.type3 .option-item:hover {
    color: #39e0ff;
}</style>