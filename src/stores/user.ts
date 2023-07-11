import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const UserInfo = reactive({
        username: '',
        token: ''
    })
    const login = async () => {
        // ****
        UserInfo.username = 'test'
        UserInfo.token = '111111111'
        //**** */
    }
    const logout = async () => {
        // ****
        UserInfo.username = ''
        UserInfo.token = ''
        //**** */
    }
    return {
        UserInfo,
        login,
        logout,
        
    }
},{
    persist: false,
})
