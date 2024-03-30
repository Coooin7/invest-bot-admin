<script setup lang="ts">
import { getAcceptsMenus } from '@/routes/menus'
import { RouterLink, useRoute } from 'vue-router'
import Card from './futuristic/Card.vue';
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
const theme = useThemeStore();
const route = useRoute()
const version = import.meta.env.VITE_VERSION
const user = useUserStore();
const menus = computed(() => {
    return getAcceptsMenus(user.UserInfo.address);
})
function in_menu(path: string) {
    return route.path.includes(path) && !(path == '/' && route.path != '/')
}
</script>
<template>
    <div class="sidebar select-none box-content text-center">
        <Card class="mx-0 h-full">
            <template #body>
                <ul class="list-none text-left p-4"
                    :class="{ type0: theme.config.themeColor == 0 || theme.config.themeColor == undefined, type1: theme.config.themeColor == 1, type2: theme.config.themeColor == 2, type3: theme.config.themeColor == 3 }">
                    <li v-for="(m, i) in menus" :key="i" :class="{ active: in_menu(m.path) }">
                        <RouterLink :to="m.path" class="nav-link p-4 my-2 flex items-center rounded-lg text-xl">
                            <svg class="w-6 h-6 mr-3 i1" v-if="m.ico === '1'" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="3.5" y="12" width="3" height="8" fill="#5B8BAB" />
                                <rect x="17.5" y="8" width="3" height="12" fill="#5B8BAB" />
                                <rect x="10.5" y="4" width="3" height="16" fill="#5B8BAB" />
                            </svg>
                            <svg class="w-6 h-6 mr-3 i2" v-else-if="m.ico === '2'" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4V20H20" stroke="#5B8BAB" stroke-width="2" />
                                <path d="M8 15L12 11H15L20 6M20 6H13M20 6V13" stroke="#5B8BAB" stroke-width="2" />
                            </svg>
                            <svg class="w-6 h-6 mr-3 i3" v-else-if="m.ico === '3'" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H20" stroke="#5B8BAB"
                                    stroke-width="2" />
                                <circle cx="9.5" cy="11.5" r="2.5" fill="#5B8BAB" />
                                <circle cx="17.5" cy="11.5" r="2.5" fill="#5B8BAB" />
                            </svg>
                            <svg class="w-6 h-6 mr-3 i4" v-else-if="m.ico === '4'" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M13.9435 15.7917L13.2857 15.2931C13.3 15.196 13.308 15.0981 13.3097 15C13.3108 14.9014 13.3024 14.8029 13.2846 14.7059L13.9372 14.2073C13.9649 14.1843 13.9837 14.1528 13.9905 14.118C13.9973 14.0833 13.9918 14.0472 13.9748 14.0159L13.3588 12.978C13.3401 12.9466 13.3107 12.9228 13.2757 12.9107C13.2407 12.8986 13.2024 12.899 13.1677 12.9118L12.4054 13.212C12.2461 13.0899 12.0696 12.9908 11.8813 12.9179L11.7643 12.1262C11.7602 12.0911 11.7428 12.0588 11.7156 12.0355C11.6884 12.0122 11.6533 11.9995 11.6171 12H10.385C10.3483 12.0004 10.313 12.0132 10.285 12.0362C10.2569 12.0592 10.238 12.0911 10.2315 12.1262L10.1145 12.9179C9.92874 12.995 9.7534 13.0941 9.59246 13.213L8.82814 12.9118C8.79334 12.8998 8.75535 12.8998 8.72055 12.9118C8.68575 12.9239 8.65627 12.9472 8.63706 12.978L8.021 14.0159C8.00228 14.047 7.99578 14.0836 8.00269 14.119C8.00961 14.1544 8.02947 14.1861 8.05859 14.2083L8.71119 14.7069C8.68661 14.9019 8.68661 15.0991 8.71119 15.2941L8.05859 15.7927C8.03111 15.8158 8.01251 15.8474 8.00587 15.8821C7.99923 15.9169 8.00493 15.9529 8.02205 15.984L8.6381 17.022C8.6567 17.0531 8.68596 17.0768 8.72073 17.0889C8.7555 17.101 8.79354 17.1007 8.82814 17.0882L9.59142 16.788C9.75038 16.91 9.92657 17.0091 10.1145 17.0821L10.2315 17.8738C10.2373 17.9095 10.2561 17.9419 10.2845 17.9651C10.3129 17.9883 10.349 18.0007 10.386 18H11.6171C11.6537 17.9996 11.6891 17.9868 11.7171 17.9638C11.7451 17.9407 11.764 17.9089 11.7706 17.8738L11.8875 17.0821C12.0724 17.0063 12.2462 16.9071 12.4044 16.787L13.1739 17.0882C13.2087 17.1002 13.2467 17.1002 13.2815 17.0882C13.3163 17.0761 13.3458 17.0528 13.365 17.022L13.9811 15.984C13.9983 15.9526 14.004 15.9164 13.9972 15.8814C13.9903 15.8464 13.9714 15.8147 13.9435 15.7917ZM11.001 15.8996C10.8185 15.8994 10.6402 15.8464 10.4885 15.7475C10.3369 15.6485 10.2187 15.5079 10.149 15.3435C10.0793 15.1791 10.0612 14.9983 10.0969 14.8239C10.1326 14.6494 10.2206 14.4892 10.3498 14.3635C10.4789 14.2378 10.6434 14.1522 10.8224 14.1176C11.0014 14.083 11.187 14.1009 11.3556 14.169C11.5242 14.2371 11.6683 14.3524 11.7696 14.5003C11.871 14.6482 11.9251 14.8221 11.9251 15C11.9253 15.1183 11.9014 15.2354 11.855 15.3446C11.8086 15.4539 11.7406 15.5532 11.6547 15.6368C11.5689 15.7203 11.4669 15.7866 11.3548 15.8317C11.2426 15.8768 11.1224 15.8998 11.001 15.8996Z"
                                    fill="#5B8BAB" />
                                <path
                                    d="M14 2H6C5.47005 2.00158 4.96227 2.2128 4.58753 2.58753C4.2128 2.96227 4.00158 3.47005 4 4V20C4.00158 20.5299 4.2128 21.0377 4.58753 21.4125C4.96227 21.7872 5.47005 21.9984 6 22H18C18.5299 21.9984 19.0377 21.7872 19.4125 21.4125C19.7872 21.0377 19.9984 20.5299 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                                    fill="#5B8BAB" />
                            </svg>
                            <svg class="w-6 h-6 mr-3 i5" v-else-if="m.ico === '5'" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M14 2H6C5.47005 2.00158 4.96227 2.2128 4.58753 2.58753C4.2128 2.96227 4.00158 3.47005 4 4V20C4.00158 20.5299 4.2128 21.0377 4.58753 21.4125C4.96227 21.7872 5.47005 21.9984 6 22H18C18.5299 21.9984 19.0377 21.7872 19.4125 21.4125C19.7872 21.0377 19.9984 20.5299 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                                    fill="#5B8BAB" />
                                <path d="M8 12H15" stroke="#5B8BAB" stroke-width="2" />
                                <path d="M8 16.5H16" stroke="#5B8BAB" stroke-width="2" />
                            </svg>
                            <svg class="w-6 h-6 mr-3 i5" v-else-if="m.ico === '6'" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5836" width="32" height="32">
                                <path
                                    d="M272 122.24h480v157.056h96V0.448h-96L272 0c-52.8 0-96 0.448-96 0.448v278.848h96v-157.12z m403.648 603.392L896 512 675.648 298.368 608 364.48 760.128 512 608 659.52l67.648 66.112zM416 659.52L263.808 512 416 364.48l-67.712-66.112L128 512l220.288 213.632L416 659.52z m336 242.304H272v-157.12h-96V1024h672V744.704h-96v157.12z"
                                    fill="#5B8BAB" p-id="5837"></path>
                            </svg>
                            <span>{{ m.title }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </template>
            <template #footer>
                <p class="text-[#607D8B] py-6">
                    {{ version }}
                </p>
            </template>
        </Card>

    </div>
</template>
<style scoped>
.type0>li a {
    color: #ff00dd;
}

.type1>li a {
    color: #00ff00;
}

.type2>li a {
    color: #ff0040;
}

.type3>li a {
    color: #5B8BAB;
    --hover-color: #ffff;
    --active-color: #57BBFF;
}

.type3>li a:hover {
    color: #fff;
    text-decoration: none;
}

.active {
    background-image: linear-gradient(90deg, #0D324A 0%, #0B2535 100%);
    border-radius: 0.5rem;
}

.active span {
    font-weight: bold;
    color: var(--active-color);
}

.active:hover span {
    font-weight: bold;
    color: var(--hover-color);
}

.nav-link:hover .i1 rect,
.nav-link:hover .i4 path {
    fill: var(--hover-color);
}

.nav-link:hover .i2 path {
    stroke: var(--hover-color);
}

.nav-link:hover .i3 path {
    stroke: var(--hover-color);
}

.nav-link:hover .i3 circle {
    fill: var(--hover-color);
}

.nav-link:hover .i5 path {
    stroke: var(--hover-color);
}

.nav-link:hover .i5 path:first-of-type {
    stroke: none;
    fill: var(--hover-color);
}

/**acitve */
.active .i1 rect,
.active .i4 path {
    fill: var(--active-color);
}

.active .i2 path {
    stroke: var(--active-color);
}

.active .i3 path {
    stroke: var(--active-color);
}

.active .i3 circle {
    fill: var(--active-color);
}

.active .i5 path {
    stroke: var(--active-color);
}

.active .i5 path:first-of-type {
    stroke: none;
    fill: var(--active-color);
}</style>