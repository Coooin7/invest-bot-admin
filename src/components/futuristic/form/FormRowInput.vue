<script setup lang="ts">
type InputPropo = {
    modelValue?:any,
    placeholder?:string,
    type?:'text'|'password'|'textarea'|'eamil',
    name?:string,
    rows?:number,
}
defineProps<InputPropo>()
defineEmits(['update:modelValue'])
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
</script>
<template>
    <div :class="theme.createThemeClassName()">
        <label v-if="name" class="text-muted select-none">{{ name }}</label>
        <div>
            <input v-if="type!=='textarea'" class="form-control" :name="name" :placeholder="placeholder" :type="type" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as any).value)">
            <textarea v-else class="form-control" :rows="rows" :class="theme.themeScrollClassName" :name="name" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)"></textarea>
        </div>
    </div>
</template>
<style scoped>
.text-muted {
    font-size: 1.3rem;
}

.form-control {
    padding: 8px;
    font-size: 1.2rem;
    font-family: "VT323", monospace;
    outline: none;
    background: rgba(0, 0, 0, 0.35);
    color: #00e7ff;
    line-height: normal;
    width: 100%;
    resize: vertical;
}
/**color0 */
.type0 .text-muted {
    color: #be26fc;
}
.type0 .form-control{
    border: #be26fc 1px solid;
}
/**color1 */
.type1 .text-muted {
    color: #26fc5c;
}
.type1 .form-control{
    border: #26fc5c 1px solid;
}
/**color2 */
.type2 .text-muted {
    color: #fc2626;
}
.type2 .form-control{
    border: #fc2626 1px solid;
}
/**color3 */
.type3 .text-muted {
    color: #39e0ff;
}
.type3 .form-control{
    border: #39e0ff 1px solid;
}
</style>