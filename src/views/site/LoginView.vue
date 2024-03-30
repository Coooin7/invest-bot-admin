<script setup lang="ts">
import { UserService } from '@/servies/user';
import { reactive, onMounted, ref } from 'vue';
import Card from '@/components/futuristic/Card.vue';
import Button from '@/components/futuristic/Button.vue'
import Popup from '@/components/futuristic/Popup.vue';
import TextAnimate from '@/components/futuristic/TextAnimate.vue'
import { useRoute, useRouter } from 'vue-router';
import { MessageBox } from '@/utils/message';
const route = useRoute();
const router = useRouter();
const popup = ref(Popup)
const w = window.innerWidth;
const h = window.innerHeight;
const boxWidth = 160;
const data = reactive({
    loading: false,
    boxs: [
        {
            title: 'Autonomous investment decisions powered by AI agents',
            x: (w - 400) / 4,
            y: h / 4,
            transform: '',
            tx: 0,
            ty: 0
        },
        {
            title: 'Time-tested star AI investors refined through market turbulence',
            x: w - (w - 400) / 4,
            y: h / 4,
            transform: '',
            tx: 0,
            ty: 0
        },
        {
            title: 'A digitally native community for symbiotic prosperity between humans and AI',
            x: w - (w - 400) / 4,
            y: h - h / 4,
            transform: '',
            tx: 0,
            ty: 0
        },
        {
            title: 'Endowing AI with accurate real-time inquiries, calculations and social interactivity',
            x: (w - 400) / 4,
            y: h - h / 4,
            transform: '',
            tx: 0,
            ty: 0
        },
        {
            title: 'Competitions among AI investors of diverse strategies and styles',
            x: (w - 150) / 2,
            y: (h - 400) / 4 - 60,
            transform: '',
            tx: 0,
            ty: 0
        }
    ],
})

const lastMouse = {
    x: 0,
    y: 0
}
const maxStep = 20;
function mousemove(e: MouseEvent) {
    for (const k in data.boxs) {

        if (lastMouse.x > e.clientX && data.boxs[k].tx > maxStep * (-1)) {
            data.boxs[k].tx--
        } else if (lastMouse.x < e.clientX && data.boxs[k].tx < maxStep) {
            data.boxs[k].tx++
        }
        if (lastMouse.y > e.clientY && data.boxs[k].ty > maxStep * (-1)) {
            data.boxs[k].ty--
        } if (lastMouse.y < e.clientY && data.boxs[k].ty < maxStep) {
            data.boxs[k].ty++
        }
        const xr = Math.sqrt(Math.pow(e.clientX - data.boxs[k].x, 2) + Math.pow(e.clientY - data.boxs[k].y, 2));
        const s = 1 - xr / 1000
        data.boxs[k].transform = `translate(${data.boxs[k].tx}px,${data.boxs[k].ty}px) scale(${s})`
    }

    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
}
function connect(e: Event) {
    e.preventDefault()
    data.loading = true
    UserService.connect().then(() => {
        data.loading = false
        if (route.path === '/home') {
            router.replace('/')
        }
    }).catch(err => {
        //4001 or other
        data.loading = false;
        MessageBox.error(err.message);
        if (err.code === undefined) {
            popup.value?.open();
        }
    })

}
function install_metamask() {
    window.open('https://metamask.io/', '_blank')
}
function close_popup() {
    popup.value?.close();
}
</script>
<template>
    <div>
        <div>
            <Card v-for="(box, i) in data.boxs" :key="i"
                class="boxs fixed select-none text-sm hover:opacity-100"
                :data-index="i"
                :style="{ left: box.x + 'px', top: box.y + 'px', width: boxWidth + 'px', transform: box.transform }">
                <template #body>
                    <p class="p-4">
                        {{ box.title }}
                    </p>
                </template>
            </Card>
        </div>
        <div class="logup-page fixed left-0 top-0 w-full h-full flex justify-center items-center min-h-[100vh] select-none"
            @mousemove="mousemove">
            <Card>
                <template #header>
                    <p class="text-center py-4">
                        <TextAnimate text="Wecome to Coooin" />
                    </p>
                </template>
                <template #body>
                    <form @submit="connect" class="w-full flex justify-center items-center flex-col py-8">
                        <img class="aspect-auto w-[12rem] mb-4" src="../assets/login-left.png">
                        <div class="flex flex-col items-center py-6 w-[400px]">
                            <Button :loading="data.loading">
                                <template #icon>
                                    <svg class="inline-block mr-2" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_18_2)">
                                            <g filter="url(#filter0_d_18_2)">
                                                <path d="M18.3 19.7753L20.424 18.9853L18.908 18.1953L18.3 19.7753Z"
                                                    fill="#39E0FF" />
                                                <path d="M13.7 19.7753L11.576 18.9853L13.092 18.1953L13.7 19.7753Z"
                                                    fill="#39E0FF" />
                                                <path
                                                    d="M15.9807 23.344H17.4887M17.4887 23.344L17.9727 25.6207H14.0274L14.5114 23.344M17.4887 23.344L20.392 21.3227M17.4887 23.344L17.7447 11.1893M17.4887 23.344L21.018 25.08M28.1054 21.1807L20.392 21.3227M28.1054 21.1807L26.5687 15.8393M28.1054 21.1807L26.7107 26.8447L21.018 25.08M20.392 21.3227L21.018 25.08M20.392 21.3227L22.9254 16.7113M17.7447 11.1893L19.3387 7.23333M17.7447 11.1893L21.132 14.2353M17.7447 11.1893L27.0807 4.15933M19.3387 7.23333L27.0807 4.15933M19.3387 7.23333H15.9807M27.0807 4.15933L28.3334 7.97333L27.1947 12.4707M27.1947 12.4707L27.3087 14.7473L26.5687 15.8393M27.1947 12.4707L28.1907 12.3M26.5687 15.8393L21.132 14.2353M21.018 25.08L17.9727 27.8407H15.9807M21.018 25.08L23.7647 21.2607M21.132 14.2353L22.9254 16.7113M28.1907 13.552L27.2547 13.666M17.626 16.8293L22.9254 16.7113M16.0194 23.344H14.5114M14.5114 23.344L11.608 21.3227M14.5114 23.344L14.2554 11.1893M14.5114 23.344L10.982 25.08M3.89469 21.1807L11.608 21.3227M3.89469 21.1807L5.43135 15.8393M3.89469 21.1807L5.28935 26.8447L10.982 25.08M11.608 21.3227L10.982 25.08M11.608 21.3227L9.07469 16.7113M14.2554 11.1893L12.6614 7.23333M14.2554 11.1893L10.868 14.2353M14.2554 11.1893L4.91935 4.15933M12.6614 7.23333L4.91935 4.15933M12.6614 7.23333H16.0194M4.91935 4.15933L3.66669 7.97333L4.80535 12.4707M4.80535 12.4707L4.69135 14.7473L5.43135 15.8393M4.80535 12.4707L3.80869 12.3M5.43135 15.8393L10.868 14.2353M10.982 25.08L14.0274 27.8407H16.0194M10.982 25.08L8.23535 21.2607M10.868 14.2353L9.07469 16.7113M3.80869 13.552L4.74535 13.666M14.374 16.8293L9.07469 16.7113M18.3 19.7753L20.424 18.9853L18.908 18.1953L18.3 19.7753ZM13.7 19.7753L11.576 18.9853L13.092 18.1953L13.7 19.7753Z"
                                                    stroke="#39E0FF" stroke-width="1.2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </g>
                                        </g>
                                    </svg>
                                </template>
                                <span>Connect Wallet</span>
                            </Button>
                        </div>
                    </form>
                </template>
            </Card>
        </div>
        <Popup ref="popup">
            <template #header>
                Please install metamask first!
            </template>
            <template #body>

                <div class="mt-4 text-center w-[600px] py-4">
                    <Button type="success" @click="install_metamask">install metamask</Button>
                    <Button class="ml-2" type="default" @click="close_popup">Cancel</Button>
                </div>
            </template>
        </Popup>
    </div>
</template>
<style scoped></style>