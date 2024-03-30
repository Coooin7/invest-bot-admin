<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { AudioManager } from '@/utils/audio';
import { onMounted } from 'vue';
const theme = useThemeStore();
const slot = defineSlots();
defineProps({
    padding:String,
    margin:String,
})
onMounted(() => {
    AudioManager.playSound('/static/audio/typing.mp3');
})
</script>
<template>
    <article :class="theme.createThemeClassName()">
        <div class="card-warp h-full">
            <div class="card-border-line card-border-line-1"></div>
            <div class="card-border-line card-border-line-2"></div>
            <div class="card-border-line card-border-line-3"></div>
            <div class="card-border-line card-border-line-4"></div>
            <div class="card-border-point card-border-point-1"></div>
            <div class="card-border-point card-border-point-2"></div>
            <div class="card-border-point card-border-point-3"></div>
            <div class="card-border-point card-border-point-4"></div>
            <div class="h-full flex flex-col items-center justify-between">
                <div class="w-full">
                    <template v-if="slot['header']">
                        <header class="card-header">
                            <h1 class="text-2xl font-bold" :style="{padding,margin}">
                                <slot name="header" />
                            </h1>
                        </header>
                    </template>

                    <div class="card-body overflow-x-auto" :class="theme.themeScrollClassName" :style="{padding,margin}">
                        <slot name="body" />
                    </div>
                </div>
                <footer v-if="slot['footer']">
                    <slot name="footer" />
                </footer>
            </div>
        </div>
    </article>
</template>
<style scoped>
.card-warp {
    display: block;
    padding: 1px;
    position: relative;
    backdrop-filter: blur(4px);
    animation: card 600ms 1;

    --animate-time: 3s;
}

.card-border-line {
    z-index: 1;
    opacity: 1;
    position: absolute;
    transition: all 400ms ease-in;
    border-style: solid;
}

.card-border-line-1 {
    top: 50%;
    left: 0;
    height: 100%;
    transform: translate(0, -50%);
    border-width: 0 0 0 1px;
    animation: card-body-height var(--animate-time) 1;
}

.card-border-line-2 {
    top: 50%;
    right: 0;
    height: 100%;
    transform: translate(0, -50%);
    border-width: 0 0 0 1px;
    animation: card-body-height var(--animate-time) 1;
}

.card-border-line-3 {
    top: 0;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 0);
    border-width: 1px 0 0 0;
    animation: card-body-width var(--animate-time) 1;
}

.card-border-line-4 {
    left: 50%;
    width: 100%;
    bottom: 0;
    transform: translate(-50%, 0);
    border-width: 1px 0 0 0;
    animation: card-body-width var(--animate-time) 1;
}

.card-border-point {
    z-index: 2;
    opacity: 1;
    position: absolute;
    transition: all 400ms ease-in;
    border-style: solid;
    width: 24px;
    height: 24px;
}

.card-border-point-1 {
    left: -2px;
    top: -2px;
    border-width: 2px 0 0 2px;
    border-top-left-radius: 0.5rem;
}

.card-border-point-2 {
    left: -2px;
    bottom: -2px;
    border-width: 0 0 2px 2px;
    border-bottom-left-radius: 0.5rem;
}

.card-border-point-3 {
    right: -2px;
    top: -2px;
    border-width: 2px 2px 0 0;
    border-top-right-radius: 0.5rem;
}

.card-border-point-4 {
    right: -2px;
    bottom: -2px;
    border-width: 0 2px 2px 0;
    border-bottom-right-radius: 0.5rem;
}

.card-header {
    position: relative;
    transition: all 250ms ease-out;
}

.card-header h1 {
    font-size: 24px;
}

.card-header-line {
    left: 50%;
    width: 100%;
    display: block;
    position: absolute;
    transform: translateX(-50%);
    transition: all 250ms ease-in;
    border-style: solid;
    border-width: 0 0 1px;
}

.card-body {
    transition: all 600ms ease-out;
}

/**color0 */
.type0 .card-warp {
    background-color: rgba(143, 27, 189, 0.137);
}

.type0 .card-header-line {
    border-color: #8e1bbd;

}

.type0 .card-header h1 {
    color: #be26fc;
}

.type0 .card-border-point {
    border-color: #be26fc;
}

.type0 .card-border-line {
    border-color: #78179e;
    box-shadow: 0 0 4px rgba(142, 27, 189, 0.65);
}

/**color1 */
.type1 .card-warp {
    background-color: rgba(27, 189, 41, 0.137);
}

.type1 .card-header-line {
    border-color: #01c901;

}

.type1 .card-header h1 {
    color: #00ff00;
}

.type1 .card-border-point {
    border-color: #03df03;
}

.type1 .card-border-line {
    border-color: #009b00;
    box-shadow: 0 0 4px rgba(142, 27, 189, 0.65);
}

/**color2 */
.type2 .card-warp {
    background-color: rgba(189, 27, 62, 0.137);
}

.type2 .card-header-line {
    border-color: #a30101;
}

.type2 .card-header h1 {
    color: #ff0000;
}

.type2 .card-border-point {
    border-color: #ca0303;
}

.type2 .card-border-line {
    border-color: #b80000;
    box-shadow: 0 0 4px rgba(189, 27, 62, 0.65);
}

/**color3 */
.type3 .card-warp {
    background-color: rgba(6, 28, 49, 0.76);
}

.type3 .card-header-line {
    border-color: #0175a3;
}

.type3 .card-header h1 {
    border-bottom: 2px solid var(--color-3, #5B8BAB);
}

.type3 .card-border-point {
    border-color: #39e0ff;
}

.type3 .card-border-line {
    border-color: #0172bd;
    box-shadow: 0 0 4px rgba(27, 130, 189, 0.65);
}

@-webkit-keyframes card {
    0% {
        transform: scaleY(0);
        opacity: 0;
    }

    100% {
        transform: scaleY(1);
        opacity: 1;
    }
}

@-webkit-keyframes card-body-width {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

@keyframes card {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes card-body-width {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

@keyframes card-body-height {
    0% {
        height: 0%;
    }

    100% {
        height: 100%;
    }
}
</style>