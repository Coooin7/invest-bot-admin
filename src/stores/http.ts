import { defineStore } from "pinia";
import { reactive } from "vue";

export const useHttpStore = defineStore('http',()=>{
    const client = reactive({
        loading:false,
    })
    const setLoading = (loading:boolean)=>{
        client.loading = loading
    }
    return {
        client,
        setLoading,
    }
})