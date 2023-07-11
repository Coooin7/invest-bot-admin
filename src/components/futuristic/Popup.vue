<script setup lang="ts">
import { reactive } from 'vue';
import Card from './Card.vue';
const props = defineProps({
    width:String
})
const data = reactive({
    show:false
})
const close = ()=>{
    data.show = false;
}
const open = ()=>{
    data.show = true;
}
defineExpose({
    close,
    open,
})
</script>
<template>
    <div v-if="data.show" class="flex w-full justify-center items-center fixed left-0 top-0 h-full popup-bg">
        <Card :style="{width:props.width}">
            <template #header>
                <div class="select-none text-center">
                    <slot name="header"/>
                </div>
            </template>
            <template #body>
                <div>
                    <slot name="body"/>
                </div>
            </template>
        </Card>
    </div>
</template>
<style scoped>
.popup-bg{
    background-color: rgba(0, 0, 0, 0.3);
}
</style>