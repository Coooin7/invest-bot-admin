import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useHttpStore } from '@/stores/http';
import { MessageBox } from '@/utils/message';
export const HttpCustomConfig = {
    loading: true
}
export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
})

httpClient.interceptors.request.use((config) => {
    config.timeout = 10000;
    const user = useUserStore()
    const httpStore = useHttpStore()
    if (user.UserInfo.token) {
        config.headers['token'] = user.UserInfo.token
    }
    HttpCustomConfig.loading && httpStore.setLoading(true)
    return config
})

httpClient.interceptors.response.use((response) => {
    const httpStore = useHttpStore()
    httpStore.setLoading(false)
    const data = response.data
    if (response.status == 200 && data.code == 200) {
        return data
    } else {
        MessageBox.error(data.message)
        return Promise.reject(response)
    }
}, err => {
    const httpStore = useHttpStore()
    httpStore.setLoading(false)
    const data = err.response.data
    if (data) {
        MessageBox.error(data.message)
    } else {
        MessageBox.error('Network Error');
    }

    return Promise.reject(err)
})
