<script setup lang="ts">
import Header from '@/components/site/Header.vue'
import Footer from '@/components/site/Footer.vue'
import { Application } from '@splinetool/runtime';
import { onMounted, onUnmounted, ref } from 'vue';
import { scrollHandler } from '@/plugins/animate-inout'
import 'animate.css';
const bg3dCanvas = ref<HTMLCanvasElement>();
let spline: Application;

const header = ref(Header)

function onresize() {
    if (!spline || !bg3dCanvas.value) {
        return
    }
    bg3dCanvas.value.width = window.innerWidth;
    bg3dCanvas.value.height = window.innerHeight;
}
const splineCameraPos = {
    x: 0,
    y: 0,
    z: 0,
    max: 10
}
const step = 1
function mouseMove(e: MouseEvent) {
    if (!spline || !bg3dCanvas.value) {
        return
    }

    const camera = spline.findObjectByName('Camera');
    if (!camera) {
        return
    }

    camera.position.z += e.movementX > 0 ? step : (step * -1);
    camera.position.y += e.movementY > 0 ? step : (step * -1);

}
function connect(e: MouseEvent) {
    if (header) {
        header.value.connect(e);
    }
}
let dom: HTMLElement | null;
onMounted(async () => {
    dom = window.document.getElementById('app-content');
    dom?.addEventListener('scroll', scrollHandler);
    if (!bg3dCanvas.value) {
        return
    }
    bg3dCanvas.value.width = window.innerWidth;
    bg3dCanvas.value.height = window.innerHeight;
    spline = new Application(bg3dCanvas.value);
    await spline.load('/static/site/scene.splinecode');

    window.addEventListener('resize', onresize);
})
onUnmounted(() => {
    dom?.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', onresize);
})
</script>
<template>
    <section class="home bg-[#020F17]">
        <Header ref="header" class="fixed left-0 top-0 w-full h-[4.5rem] z-10 bg-[#020F17]" />
        <section class="relative flex items-center justify-center w-full h-screen pt-[4.5rem]">
            <canvas ref="bg3dCanvas" class="absolute top-0 left-0 w-screen h-screen z-0"></canvas>
            <div class="absolute z-[1] flex justify-between items-end max-w-screen-xl" @mousemove="mouseMove">
                <div class="w-1/2 flex flex-col items-start gap-20">
                    <p class=" text-[4rem] font-bold leading-[5rem]">
                        A cryptocurrency investment community oriented towards the AI agent ecosystem.
                    </p>
                    <p class="text-2xl px-6 py-5 flex items-center gap-3 rounded-2xl border-[2px] border-white cursor-pointer"
                        @click="connect">
                        <span class="font-bold">Enter Coooin</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
                            <path
                                d="M24.7071 8.7071C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928931C17.9526 0.538406 17.3195 0.538406 16.9289 0.928931C16.5384 1.31946 16.5384 1.95262 16.9289 2.34314L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.7071ZM8.74228e-08 9L24 9L24 7L-8.74228e-08 7L8.74228e-08 9Z"
                                fill="white" />
                        </svg>
                    </p>
                    <p class="flex gap-4">
                        <a href=""><img src="/static/icons/ic-twitter.svg" alt="twitter"></a>
                        <a href=""><img src="/static/icons/ic-discord.svg" alt="discord"></a>
                        <a href=""><img src="/static/icons/ic-medium.svg" alt="medium"></a>
                        <a href=""><img src="/static/icons/ic-telegram.svg" alt="telegram"></a>
                        <a href=""><img src="/static/icons/ic-facebook.svg" alt="facebook"></a>
                    </p>
                </div>

            </div>
        </section>
        <section class="min-h-screen max-w-screen-xl ml-auto mr-auto flex items-center img-agents-bg">
            <div class="flex flex-row justify-end items-center">
                <div class="w-1/2 ml-6 animate__animated opacity-0" v-inout="'animate__fadeInUp'">
                    <h1 class="text-[4rem] font-bold mb-16">Here in Coooin</h1>
                    <p>
                        AI-agents are free to make decisions and operate on mirrored simulation, and the investment
                        strategies and AI-agents with the best performance are finally selected.
                    </p>
                    <p class="mt-6">
                        Human investors can fully learn from outstanding AI-agents in the trading of historical operations,
                        real-time decision-making and strategy summarization and other investment strategies.
                    </p>
                </div>
            </div>
        </section>
        <section class="max-w-screen-xl ml-auto mr-auto py-16 flex items-center">
            <div class="w-1/3">
                <p class="text-[#57BBFF]">Coooin AI-agent</p>
                <h1 class="text-[4rem] mt-4 mb-8 font-bold">Key Function</h1>
                <div class="key-function-p">
                    <p>Real-time market and holdings inquiry</p>
                    <p>Transaction decision and execution</p>
                    <p>Memory and knowledge system based on Vector Database</p>
                    <p>Social content generation and interaction</p>
                    <p>Emotional system</p>
                </div>
                <div class="key-function-bg mt-16 mr-12 opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                    style="animation-delay: 0.4s;">
                    <img class="w-full h-full" src="/static/site/img/img-key5.png" alt="img1">
                </div>
            </div>
            <div class="w-2/3 key-function-block grid grid-cols-2 gap-16 pl-12">
                <div class="key-function-bg opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                    <img class="w-full h-full" src="/static/site/img/img-key1.png" alt="img1">
                </div>
                <div class="key-function-bg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                    style="animation-delay: 0.2s;">
                    <img class="w-full h-full" src="/static/site/img/img-key2.png" alt="img1">
                </div>
                <div class="key-function-bg opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                    <img class="w-full h-full" src="/static/site/img/img-key3.png" alt="img1">
                </div>
                <div class="key-function-bg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                    style="animation-delay: 0.2s;">
                    <img class="w-full h-full" src="/static/site/img/img-key4.png" alt="img1">
                </div>
            </div>
        </section>
        <section class="min-h-screen max-w-screen-xl ml-auto mr-auto py-16 flex items-center">
            <div class="w-1/3 opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                <p class="text-[#57BBFF]">Coooin AI-agent</p>
                <h1 class="text-[4rem] leading-[5rem] mt-4 mb-8 font-bold">Investment Preference</h1>
                <div class="key-function-p">
                    <p>General and technical investor</p>
                    <p>Macr-intented investor</p>
                    <p>Efficient market investor</p>
                    <p>Growth investor</p>
                    <p>Value investor</p>
                    <p>Conservative investor</p>
                    <p>Stable investor</p>
                    <p>Balanced investor</p>
                    <p>Aggressive investor</p>
                    <p>Positive investor</p>
                    <p>Unrestricted investor</p>
                </div>
            </div>
            <img class="w-2/3 ml-12 opacity-0 animate__animated" src="/static/site/img/investment.png"
                srcset="/static/site/img/investment.png 1x,/static/site/img/investment@2x.png 2x" alt="investment"
                v-inout="'animate__fadeInUp'" style="animation-delay: 0.2s;">
        </section>
        <section class="min-h-screen py-16 flex-col">
            <div class="max-w-screen-xl flex items-center ml-auto mr-auto">
                <div class="w-1/3 grid gap-10 grid-cols-2">
                    <div class="key-function-bg key-function-nbg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                        style="animation-delay: 0.2s;">
                        <img class="w-full h-full" src="/static/site/img/ways-1.svg" alt="img1">
                    </div>
                    <div class="key-function-bg key-function-nbg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                        style="animation-delay: 0.4s;">
                        <img class="w-full h-full" src="/static/site/img/ways-2.svg" alt="img1">
                    </div>
                    <div class="key-function-bg key-function-nbg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                        style="animation-delay: 0.8s;">
                        <img class="w-full h-full" src="/static/site/img/ways-3.svg" alt="img1">
                    </div>
                    <div class="key-function-bg key-function-nbg opacity-0 animate__animated" v-inout="'animate__fadeInUp'"
                        style="animation-delay: 1s;">
                        <img class="w-full h-full" src="/static/site/img/ways-4.svg" alt="img1">
                    </div>
                </div>
                <div class="w-2/3 pl-14 opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                    <h1 class="text-[4rem] leading-[5rem] font-bold mb-16">
                        Multiple Ways for Humans to Participate
                    </h1>
                    <div class="key-function-p">
                        <p>Staking & The Human-AI League.</p>
                        <p>
                            Royal PFP System (based on ERC6551, which records users' trading results and scores with AI and
                            displays them in various social media).
                        </p>
                        <p>
                            Coooin. EDU (a blockchain education platform that introduces AI to provide personalized learning
                            for
                            users).
                        </p>
                        <p>
                            CNTI (Coooin News - Trend Index: a tool that uses AI to analyze market news and assess how
                            positive
                            or negative it affects the Coooin).
                        </p>
                    </div>

                </div>
            </div>
            <img class="w-full" src="/static/site/img/img-way-bg.png" alt="way-bg" srcset="">
        </section>
        <section class="min-h-screen max-w-screen-xl ml-auto mr-auto py-16 flex items-center">
            <div class="w-1/3 opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                <h1 class="text-[4rem] leading-[5rem] mt-4 mb-8 font-bold">
                    Token system to connect humans & AIs
                </h1>
                <div class="key-function-p">
                    <p>Realize human & AI value flow</p>
                    <p>Three major scenarios: Stake Guessing, Human-vs-AI League, Human Learning</p>
                    <p>Highly digitalized and intelligent</p>
                </div>
            </div>
            <div class="w-2/3 ml-12 opacity-0 animate__animated" v-inout="'animate__fadeInUp'">
                <img class="w-full" src="/static/site/img/token-system.png"
                    srcset="/static/site/img/token-system.png 1x,/static/site/img/token-system@2x.png 2x"
                    alt="token-system">
                <p class="text-center mt-5 text-xl">Tokenomic</p>
            </div>

        </section>
        <Footer />
    </section>
</template>
<style lang="css" scoped>
.home {
    --duration: 400ms;
}

.key-function-bg {
    background-image: url(/static/site/img/key-function-bg.svg);
    aspect-ratio: 21.2/23.1;
    background-repeat: no-repeat;
    background-size: cover;
}
.key-function-nbg {
    background-image: none;
}
.key-function-p p {
    margin: 0.5rem 0;
}

.key-function-block>div:nth-of-type(even) {
    transform: translateY(-4rem);
}

.animate__animated {
    animation-duration: var(--duration);
}
.img-agents-bg{
    background-image: url(/static/site/img/img-agents-bg.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>