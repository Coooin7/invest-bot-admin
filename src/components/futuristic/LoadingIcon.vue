<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const theme = useThemeStore();
</script>
<template>
    <div class="c01176" :class="theme.createThemeClassName()">
      <div class="c01177 c01538 c01178"></div><div class="c01177 c01538 c01179"></div>
    </div>
</template>
<style scoped>
.c01179 {
    width: 30px;
    height: 30px;
    animation: arwes-loading-circle2 750ms infinite linear;
    margin-top: -15px;
    margin-left: -15px;
}
.c01177 {
    top: 50%;
    left: 50%;
    display: block;
    position: absolute;
    transition: all 250ms ease-out;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 50%;
    background-color: transparent;
}

.c01176 {
  z-index: 1000;
  display: block;
  opacity: 1;
  position: relative;
  min-height: 90px;
  transition: all 250ms ease-out;
}
.c01176.c01184, .c01176.c01185 {
  opacity: 0;
}
.c01177 {
  top: 50%;
  left: 50%;
  display: block;
  position: absolute;
  transition: all 250ms ease-out;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-radius: 50%;
  background-color: transparent;
}
.c01178 {
  width: 50px;
  height: 50px;
  animation: arwes-loading-circle1 750ms infinite linear;
  margin-top: -25px;
  margin-left: -25px;
}
.c01179 {
  width: 30px;
  height: 30px;
  animation: arwes-loading-circle2 750ms infinite linear;
  margin-top: -15px;
  margin-left: -15px;
}

@-webkit-keyframes arwes-loading-circle1 {
  0% {
    opacity: 0;
    transform: rotate(160deg);
  }
  50% {
    opacity: 1;
    transform: rotate(145deg);
  }
  100% {
    opacity: 0;
    transform: rotate(-320deg);
  }
}
@-webkit-keyframes arwes-loading-circle2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes arwes-loading-circle1 {
  0% {
    opacity: 0;
    transform: rotate(160deg);
  }
  50% {
    opacity: 1;
    transform: rotate(145deg);
  }
  100% {
    opacity: 0;
    transform: rotate(-320deg);
  }
}
@keyframes arwes-loading-circle2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.type0 .c01538 {
    border-top: 5px solid #be26fc;
    border-bottom: 5px solid #be26fc;
    box-shadow: 0 0 8px #be26fc;
}
.type0 .c01584 {
    border-top: 5px solid #be26fc;
    border-bottom: 5px solid #be26fc;
    box-shadow: 0 0 8px #be26fc;
}
.type1 .c01538 {
    border-top: 5px solid #03df03;
    border-bottom: 5px solid #03df03;
    box-shadow: 0 0 8px #03df03;
}
.type1 .c01584 {
    border-top: 5px solid #03df03;
    border-bottom: 5px solid #03df03;
    box-shadow: 0 0 8px #03df03;
}
.type2 .c01538 {
    border-top: 5px solid #f30606;
    border-bottom: 5px solid #f30606;
    box-shadow: 0 0 8px #f30606;
}
.type2 .c01584 {
    border-top: 5px solid #f30606;
    border-bottom: 5px solid #f30606;
    box-shadow: 0 0 8px #f30606;
}
.type3 .c01538 {
    border-top: 5px solid #06a8f3;
    border-bottom: 5px solid #06a8f3;
    box-shadow: 0 0 8px #06a8f3;
}
.type3 .c01584 {
    border-top: 5px solid #06a8f3;
    border-bottom: 5px solid #06a8f3;
    box-shadow: 0 0 8px #06a8f3;
}
</style>