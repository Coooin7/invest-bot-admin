import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { useHttpStore } from '@/stores/http';
import { MessageBox } from '@/utils/message';
import camelize from 'camelize';
import snakeize from 'snakeize';
import { checkForm } from '@/utils/common';

export const HttpCustomConfig = {
    loading: true
}
export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
})

httpClient.interceptors.request.use((config) => {
    config.timeout = 10000;
    const user = useUserStore();
    const httpStore = useHttpStore();
    if (user.UserInfo.token) {
        config.headers['token'] = user.UserInfo.token;
    }

    HttpCustomConfig.loading && httpStore.setLoading(true);

    config.data = checkForm(snakeize(config.data));
    
    return config;
})

httpClient.interceptors.response.use((response) => {
    const httpStore = useHttpStore()
    httpStore.setLoading(false)
    return new camelize(response);
}, err => {
    const httpStore = useHttpStore()
    httpStore.setLoading(false);
    console.log(err)
    MessageBox.error('Network Error');
    return Promise.reject(err);
})
