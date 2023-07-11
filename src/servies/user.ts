import { useUserStore } from "@/stores/user";
import { httpClient } from "./http"
import { useHttpStore } from '@/stores/http';

export class UserService {
    static login(){
        const user = useUserStore()
        const httpStore = useHttpStore()
        // httpClient.post('/login',form)
        httpStore.setLoading(true)
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                httpStore.setLoading(false)
                user.login()
                resolve()
            },1000)
        })
    }
}