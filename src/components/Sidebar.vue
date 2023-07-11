<script setup lang="ts">
import { menus } from '@/routes/menus'
import { RouterLink, routeLocationKey, useRoute } from 'vue-router'
import Card from './futuristic/Card.vue';
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
const route = useRoute()

</script>
<template>
    <div class="sidebar select-none box-content text-center">
        <Card class="mx-0">
            <template #header>
                <img class="w-[10rem] inline-block" src="login-left.png" alt="login-left.png">
            </template>
            <template #body>
                <ul class="list-none text-left" :class="{ type0: theme.config.themeColor == 0 || theme.config.themeColor == undefined, type1: theme.config.themeColor == 1, type2: theme.config.themeColor == 2,type3: theme.config.themeColor == 3 }">
                    <li v-for="(m, i) in menus" :key="i" class="py-2" :class="{active:route.path==m.path}">
                        <RouterLink :to="m.path">
                            {{ m.title }}
                        </RouterLink>
                    </li>
                </ul>
            </template>
        </Card>

    </div>
</template>
<style scoped>
.sidebar {
    min-width: 220px;
}
.type0>li a{
    color: #ff00dd;
}
.type1>li a{
    color: #00ff00;
}
.type2>li a{
    color: #ff0040;
}
.type3>li a{
    color: #0099ff;
}
.sidebar a{
    opacity: 0.6;
}
.active a{
    font-weight: bold;
    opacity: 1;
}
</style>