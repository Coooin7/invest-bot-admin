<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
type InputPropo = {
    modelValue?:any,
    placeholder?:string,
    name?:string,
    rows?:number,
    disabled?:boolean,
    labels?:Array<string>
}
defineProps<InputPropo>()
defineEmits(['update:modelValue'])
</script>
<template>
    <div class="min-w-[6rem]" :class="theme.createThemeClassName()">
        <label v-if="name" class="text-muted select-none">{{ name }}</label>
        <div class="switch-box relative w-16 h-8 border-[1px] box-content">
            <input 
            class="switch-input absolute left-0 top-0 w-full h-full opacity-0 z-50" 
            :name="name" :placeholder="placeholder" 
            type="checkbox" 
            :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as any).checked)" :disabled="disabled"
            />
            <div class="switch-item relative z-10">
                <span class="switch-bg block absolute"></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.text-muted {
    font-size: 1.3rem;
}
.switch-item{
    background-color: rgba(0, 0, 0, 0.4);
}
.switch-bg{
    display: inline-block;
    width: 2rem;
    height: 2rem;
    left: 0;
    top: 0;
    transition: left 400ms;
    z-index: 20;
}
.switch-item::before {
    content: 'N';
    display: inline-block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 30;
    text-align: center;
    line-height: 2rem;
}
.switch-item::after {
    content: 'Y';
    display: inline-block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 2rem;
    top: 0;
    z-index: 30;
    text-align: center;
    line-height: 2rem;
}
.switch-input:checked + .switch-item>.switch-bg{
    left: 2rem;
}
.type0 .text-muted {
    color: #be26fc;
}
.type0 .switch-bg{
    background-color: #b129aa;
}
.type0 .switch-box{
    border-color: #ff39f5;
}
.type1 .text-muted {
    color: #26fc5c;
}
.type1 .switch-bg{
    background-color: #29b147;
}
.type1 .switch-box{
    border-color: #39ff85;
}
.type2 .text-muted {
    color: #fc2626;
}
.type2 .switch-bg{
    background-color: #b1293b;
}
.type2 .switch-box{
    border-color: #ff3943;
}
.type3 .text-muted {
    color: #39e0ff;
}
.type3 .switch-bg{
    background-color: #299cb1;
}
.type3 .switch-box{
    border-color: #39e0ff;
}
</style>