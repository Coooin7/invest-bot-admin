<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const props = defineProps({
    content:String
})
</script>
<template>
    <span :class="theme.createThemeClassName()">
        {{ props.content }}
    </span>
</template>
<style scoped>
.type0{
    color: #ea00ff;
}
.type1{
    color: #00ff00;
}
.type2{
    color: #ff0022;
}
.type3{
    color: #00c3ff;
}
</style>