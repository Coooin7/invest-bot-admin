import { useUserStore } from "@/stores/user";
import { httpClient } from "./http"
import { useHttpStore } from '@/stores/http';
export class UserService {
    static connect(){
        const user = useUserStore();
        return user.connect();
    }
}