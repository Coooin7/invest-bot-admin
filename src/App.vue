<script setup lang="ts">
import {RouterView} from 'vue-router'
import { useUserStore } from './stores/user';
import Loading from './components/Loading.vue'
import Sidebar from "@/components/Sidebar.vue";
import { useThemeStore } from '@/stores/theme';
import { onMounted, watch } from 'vue';
const theme = useThemeStore();
const user = useUserStore();
function change_theme(){
  theme.setTheme()
}
onMounted(()=>{
  theme.setTheme(theme.config.themeColor);
})
</script>

<template>
  <div class="app-content flex justify-center w-full h-[100vh] overflow-y-auto overflow-x-hidden" :class="theme.themeScrollClassName">
    <Loading/>
    <Sidebar class="py-6" v-if="user.UserInfo.token"/>
    <main class="w-3/4 ml-4">
      <RouterView/>
    </main>
    <div class="fixed right-0 bottom-0 cursor-default select-none p-4 hover:font-bold" @click="change_theme">Switch Theme</div>
  </div>
</template>

<style scoped>
</style>
