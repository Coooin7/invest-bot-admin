import { object_to_query_string } from "@/utils/common";
import { httpClient } from "./http";

export class LlmKeyService{
    static list(page: QueryPage, query: LlmKeyQuery){
        const arg = Object.assign(page, query);
        const q = object_to_query_string(arg);
        return httpClient.get<{
            content:Array<llmKeyItem>,
            totalPages:number
        }>('/llmKey/search/'+q)
    }

    static save(data:llmKeyItem){
        const id = data.id;
        return httpClient.put('/llmKey/'+id+'/',data)
    }

    static add(data:llmKeyItem){
        return httpClient.post('/llmKey/',data)
    }

    static delete(id:string){
        return httpClient.delete('/llmKey/'+id+'/')
    }
}