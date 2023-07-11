<script setup lang="ts">
    const props = defineProps({
        type:String,
        message:String,
        duration:Number
    })
</script>
<template>
    <div class="message-box text-2xl">
        <b :class="{success:props.type==='success',warning:props.type==='warning',error:props.type==='error'}">{{props.message}}</b>
    </div>
</template>
<style scoped>
    .message-box{
        position: fixed;
        left: 0;
        top: 1em;
        z-index: 999;
        width: 100%;
        text-align: center;
        color: #fff;
    }
    .success{
        color: #00ff00;
    }
    .error{
        color: #FF5722;
    }
    .warning{
        color: #FFEB3B;
    }
</style>