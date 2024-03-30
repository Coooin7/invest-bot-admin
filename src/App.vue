<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Loading from './components/Loading.vue'
import Sidebar from "@/components/Sidebar.vue";
import NavBar from "@/components/NavBar.vue";
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const theme = useThemeStore();
const route = useRoute();

const isSiteHome = computed(() => {
  return route.path.includes('/home');
})
</script>

<template>
  <div id="app-content" class="w-screen h-screen overflow-x-hidden overflow-y-auto bg-black" :class="theme.themeScrollClassName"
    :style="{ padding: !isSiteHome ? '2.5rem' : '0' }">
    <Loading />
    <NavBar v-if="!isSiteHome" class="h-20 mb-4" />
    <div class="content" :class="{ 'has-sider-content': !isSiteHome }">
      <Sidebar v-if="!isSiteHome" class="sidebar" />
      <main class="main" :class="{ 'has-sider-main': !isSiteHome }">
        <RouterView class="px-0 h-full w-full" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.has-sider-content {
  height: calc(100vh - 11rem);
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.sidebar {
  left: 1em;
  top: 0;
  width: 14rem;
  display: inline-block;
}

.has-sider-main {
  margin-left: 1rem;
  width: calc(100vw - 18rem);
  display: inline-block;
}
</style>
