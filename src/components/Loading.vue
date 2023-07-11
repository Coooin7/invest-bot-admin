<script setup lang="ts">
import { useHttpStore } from '@/stores/http';
import LoadingIcon from './futuristic/LoadingIcon.vue';
const httpState = useHttpStore()

</script>
<template>
  <div v-if="httpState.client.loading" class="fixed w-full h-full z-50">
    <LoadingIcon class="w-full h-full"/>
  </div>
    
</template>
<style scoped>

</style>