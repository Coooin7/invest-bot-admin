import { defineStore } from "pinia";
import { reactive } from "vue";
export enum ThemeColor {
    PURPLE = 0,
    GREEN = 1,
    RED = 2,
    BLUE = 3,
}
export type ThemeType = 'default' | 'purple' | "success" | "error";
export const useThemeStore = defineStore('theme', () => {
    const config = reactive({
        themeColor: ThemeColor.BLUE,
    })
    const setTheme = (theme?: ThemeColor) => {
        if (theme) {
            config.themeColor = theme;
        } else {
            config.themeColor = config.themeColor < 3 ? (config.themeColor + 1) : 0;
        }
        if (typeof win.themeChange === 'function') {
            win.themeChange();
        }
    }
    const win = window as any;
    win.theme = config;
    if (typeof win.themeChange === 'function') {
        win.themeChange();
    }
    // classes 
    const createThemeClassName = (classType: ThemeType='default') => {
        if (classType) {
            return {
                'type0': classType === 'purple',
                'type1': classType === 'success',
                'type2': classType === 'error',
                'type3': classType === 'default'
            }
        } else {
            return {
                'type0': config.themeColor == 0 || config.themeColor == undefined,
                'type1': config.themeColor == 1,
                'type2': config.themeColor == 2,
                'type3': config.themeColor == 3
            }
        }
    }

    const themeScrollClassName = {
        'theme-scroll-0': config.themeColor == 0 || config.themeColor == undefined,
        'theme-scroll-1': config.themeColor == 1,
        'theme-scroll-2': config.themeColor == 2,
        'theme-scroll-3': config.themeColor == 3,
    }

    return {
        config,
        setTheme,
        createThemeClassName,
        themeScrollClassName,
    }
}, {
    persist: true,
})