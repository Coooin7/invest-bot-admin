import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { connectWallet, disconnectWallet, ethereum, getAddress } from '@/utils/wallet'
import { useRoute, useRouter } from "vue-router";

let initConnect = false;
export const useUserStore = defineStore('user', () => {
    const address = getAddress();
    const UserInfo = reactive({
        address: address ? address : '',
        token: '',
    })
    const route = useRoute();
    const router = useRouter();
    !initConnect && ethereum && ethereum.on('accountsChanged', (accounts: string[]) => {
        UserInfo.address = getAddress();
        if (!UserInfo.address && route.path != '/home') {
            router.replace('/home');
        }else if(UserInfo.address && route.path == '/home'){
            router.replace('/');
        }
    })
    initConnect = true;
    const connect = async () => {
        // ****
        // ****
        await connectWallet();
        UserInfo.address = getAddress();

    }
    const disconnect = async () => {
        // ****
        disconnectWallet();
        UserInfo.address = '';
        router.replace('/home');
        //**** */
    }
    return {
        UserInfo,
        connect,
        disconnect,
    }
}, {
    persist: false,
})
