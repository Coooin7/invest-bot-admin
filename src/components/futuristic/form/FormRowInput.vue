<script setup lang="ts">
type InputPropo = {
    modelValue?: any,
    placeholder?: string,
    type?: 'text' | 'password' | 'textarea' | 'eamil' | 'number',
    name?: string,
    rows?: number,
    disabled?: boolean,
    min?: number,
    max?: number,
}
defineProps<InputPropo>()
const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
function change() {
    emits('change');
}
function focus() {
    emits('focus')
}
function clear() {
    emits('update:modelValue', '');
    emits('change');

}
</script>
<template>
    <div :class="theme.createThemeClassName()">
        <label v-if="name" class="text-muted select-none">{{ name }}</label>
        <div class="input-box">
            <input v-if="type !== 'textarea'" class="form-control" :name="name" :placeholder="placeholder" :type="type"
                :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)" @focus="focus"
                @blur="$emit('blur')" :disabled="disabled" :min="min" :max="max" @change="change" />
            <textarea v-else class="form-control" :rows="rows" :class="theme.themeScrollClassName" :disabled="disabled"
                :name="name" :placeholder="placeholder" :value="modelValue" @focus="focus" @blur="$emit('blur')"
                @input="$emit('update:modelValue', ($event.target as any).value)" @change="change"></textarea>
            <svg v-show="modelValue && !disabled" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 16 16" fill="none" @click="clear">
                <rect width="16" height="16" rx="8" fill="#3F4E60" />
                <path d="M5.00003 11L11 5.00004" stroke="white" />
                <path d="M5.00003 5L11 11" stroke="white" />
            </svg>
        </div>
    </div>
</template>
<style scoped>
.text-muted {
    font-size: 1.3rem;
}

.form-control {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    outline: none;
    background: rgba(35, 58, 87, 0.71);
    color: #00e7ff;
    line-height: normal;
    width: 100%;
    resize: vertical;
    border-radius: 0.5rem;
    padding-right: 1.5rem;
}

.input-box {
    position: relative;
}

.input-box svg {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
}

.form-control:focus {
    outline: solid 1px #5B8BAB;
}

/**color0 */
.type0 .text-muted {
    color: #be26fc;
}

.type0 .form-control {
    border: #be26fc 1px solid;
}

/**color1 */
.type1 .text-muted {
    color: #26fc5c;
}

.type1 .form-control {
    border: #26fc5c 1px solid;
}

/**color2 */
.type2 .text-muted {
    color: #fc2626;
}

.type2 .form-control {
    border: #fc2626 1px solid;
}

/**color3 */
.type3 .text-muted {
    color: #39e0ff;
}

.type3 .form-control {
    color: #fff;
    border: transparent 1px solid;
}

.type3 .form-control::placeholder {
    color: #5B8BAB;
}
</style>