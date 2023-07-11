<script setup lang="ts">
import { useThemeStore,type ThemeType } from '@/stores/theme';
import { AudioManager } from '@/utils/audio';

const theme = useThemeStore();
type btnPropo = {
    loading?:boolean,
    content?:string,
    type?: ThemeType
}

const prop = defineProps<btnPropo>();
const emit = defineEmits(['click']);
const onClick = ()=>{
    AudioManager.playSound('static/audio/click.mp3');
    emit('click');
}
const themeClass = theme.createThemeClassName(prop.type);

</script>
<template>
    <div class="btn-warp" :class="themeClass">
        <div class="btn-border-line btn-border-line-1"></div>
        <div class="btn-border-line btn-border-line-2"></div>
        <div class="btn-border-line btn-border-line-3"></div>
        <div class="btn-border-line btn-border-line-4"></div>
        <div class="btn-border-point btn-border-point-1"></div>
        <div class="btn-border-point btn-border-point-2"></div>
        <div class="btn-border-point btn-border-point-3"></div>
        <div class="btn-border-point btn-border-point-4"></div>
        <button class="button" :disabled="prop.loading" @click="onClick">
            <svg v-if="prop.loading" viewBox="0 0 24 24" class="w-4 h-4">
                <g class="btn-icon-animate">
                    <path
                        d="M11,7.83C9.83,7.42 9,6.3 9,5A3,3 0 0,1 12,2A3,3 0 0,1 15,5C15,6.31 14.16,7.42 13,7.83V10.64C12.68,10.55 12.35,10.5 12,10.5C11.65,10.5 11.32,10.55 11,10.64V7.83M18.3,21.1C17.16,20.45 16.62,19.18 16.84,17.96L14.4,16.55C14.88,16.09 15.24,15.5 15.4,14.82L17.84,16.23C18.78,15.42 20.16,15.26 21.29,15.91C22.73,16.74 23.22,18.57 22.39,20C21.56,21.44 19.73,21.93 18.3,21.1M2.7,15.9C3.83,15.25 5.21,15.42 6.15,16.22L8.6,14.81C8.76,15.5 9.11,16.08 9.6,16.54L7.15,17.95C7.38,19.17 6.83,20.45 5.7,21.1C4.26,21.93 2.43,21.44 1.6,20C0.77,18.57 1.26,16.73 2.7,15.9M14,14A2,2 0 0,1 12,16C10.89,16 10,15.1 10,14A2,2 0 0,1 12,12C13.11,12 14,12.9 14,14M17,14L16.97,14.57L15.5,13.71C15.4,12.64 14.83,11.71 14,11.12V9.41C15.77,10.19 17,11.95 17,14M14.97,18.03C14.14,18.64 13.11,19 12,19C10.89,19 9.86,18.64 9.03,18L10.5,17.17C10.96,17.38 11.47,17.5 12,17.5C12.53,17.5 13.03,17.38 13.5,17.17L14.97,18.03M7.03,14.56L7,14C7,11.95 8.23,10.19 10,9.42V11.13C9.17,11.71 8.6,12.64 8.5,13.7L7.03,14.56Z"
                        style="fill: green;"></path>
                    <rect width="24" height="24" fill="transparent"></rect>
                </g>
            </svg>
            <span v-if="prop.content">{{prop.content}}</span>
            <slot/>
        </button>
    </div>
</template>
<style scoped>
.btn-warp {
    display: inline-block;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    padding: 1px;
    box-sizing: border-box;
    
    --animate-time:400ms;
}
.btn-border-line {
    z-index: 1;
    opacity: 1;
    position: absolute;
    transition: all var(--animate-time) ease-in;
    border-style: solid;
    box-shadow: 0 0 4px rgba(0, 153, 0, 0.65);
}

.btn-border-line-1 {
    top: 50%;
    left: 0;
    height: 100%;
    transform: translate(0, -50%);
    border-width: 0 0 0 1px;
}

.btn-border-line-2 {
    top: 50%;
    right: 0;
    height: 100%;
    transform: translate(0, -50%);
    border-width: 0 0 0 1px;
}

.btn-border-line-3 {
    top: 0;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 0);
    border-width: 1px 0 0 0;
}

.btn-border-line-4 {
    left: 50%;
    width: 100%;
    bottom: 0;
    transform: translate(-50%, 0);
    border-width: 1px 0 0 0;
}

.btn-border-point {
    z-index: 2;
    opacity: 1;
    position: absolute;
    transition: all 250ms ease-in;
    border-style: solid;
    width: 8px;
    height: 8px;
}

.btn-border-point-1 {
    left: -1px;
    top: -1px;
    border-width: 1px 0 0 1px;
}

.btn-border-point-2 {
    left: -1px;
    bottom: -1px;
    border-width: 0 0 1px 1px;
}

.btn-border-point-3 {
    right: -1px;
    top: -1px;
    border-width: 1px 1px 0 0;
}

.btn-border-point-4 {
    right: -1px;
    bottom: -1px;
    border-width: 0 1px 1px 0;
}

.button {
    padding: 10px 20px;
    
}
.button svg {
    display: inline-block;
    margin-right: 0.3em;
}
.button[disabled]{
    filter: grayscale(1);
}
.button:focus {
    outline: none;
}

.button::-moz-focus-inner {
    border: none;
}

.button svg {
    font-size: 140%;
    line-height: 0;
    vertical-align: middle;
}

@-webkit-keyframes icon-spin {
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
}

@keyframes icon-spin {
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
}
@keyframes border-height {
    0%{
        height: 0%;
    }
    100%{
        height: 100%;
    }
}

.btn-icon-animate {
    animation: 2s linear 0s infinite normal none running icon-spin;
    transform-origin: center center;
}
/* color0 */
.type0>.button {
    color: #ea00ff;
}
.type0>.btn-border-point {
    border-color: #ff00bf;
}
.type0>.btn-border-line {
    border-color: rgb(105, 1, 79);
    box-shadow: 0 0 4px rgba(104, 1, 87, 0.65);
}
.type0:hover>.btn-border-line {
    border-color: #ea00ff;
}
.type0:hover{
    background-color: rgba(243, 5, 211, 0.116);
}
/* color1 */
.type1>.button {
    color: #00ff00;
}
.type1>.btn-border-point {
    border-color: #00ff00;
}
.type1>.btn-border-line {
    border-color: rgb(1, 129, 1);
    box-shadow: 0 0 4px rgba(1, 95, 1, 0.65);
}
.type1:hover>.btn-border-line {
    border-color: #00ff00;
}
.type1:hover{
    background-color: rgba(5, 243, 65, 0.226);
}
/* color2 */
.type2>.button {
    color: #ff0022;
}
.type2>.btn-border-point {
    border-color: #ff0040;
}
.type2>.btn-border-line {
    border-color: rgb(110, 1, 29);
    box-shadow: 0 0 4px rgba(99, 1, 17, 0.65);
}
.type2:hover>.btn-border-line {
    border-color: #ff002b;
}
.type2:hover{
    background-color: rgba(243, 5, 5, 0.151);
}
/* color3 */
.type3{
    background-color: rgba(5, 136, 243, 0.1);
}
.type3>.button {
    color: #39e0ff;
}
.type3>.btn-border-point {
    border-color: #39e0ff;
}
.type3>.btn-border-line {
    border-color: rgb(1, 99, 129);
    box-shadow: 0 0 4px rgba(1, 71, 99, 0.65);
}
.type3:hover>.btn-border-line {
    border-color: #39e0ff;
}
.type3:hover{
    background-color: rgba(5, 136, 243, 0.151);
}
</style>