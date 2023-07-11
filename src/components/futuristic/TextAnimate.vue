<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';

const props = defineProps({
    text:String
})
const data = reactive({
    chars:new Array<string>(),
    writing:true,
})
async function set_text(){
    data.writing = true;
    const txt = props.text?props.text:'';
    data.chars.length = 0;
    for (const char of txt) {
        await sync_put_char(char);
    }
    data.writing = false;
}
function sync_put_char(char:string,time:number=100){
    return new Promise<void>((resolve)=>{
        setTimeout(()=>{
            data.chars.push(char)
            resolve();
        },time)
    })
}
watch(props,()=>{
    set_text()
})
onMounted(()=>{
    if(props.text&&data.chars.length===0){
        set_text()
    }
})
</script>
<template>
    <span :class="{writing:data.writing}">
        {{ data.chars.join('') }}
    </span>
</template>
<style scoped>
.writing::after{
    content: '';
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: #ffffff;
    margin-left: 2px;
    animation: writing-animation 1s infinite;
}
@keyframes writing-animation {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>