import { object_to_query_string } from "@/utils/common";
import { httpClient } from "./http";

export class ConfigService{
    static list(page: QueryPage, query: ConfigQuery){
        const arg = Object.assign(page, query);
        const q = object_to_query_string(arg);
        return httpClient.get<{
            content:Array<ConfigItem>,
            totalPages:number
        }>('/sysConfigs/search/'+q)
    }

    static save(data:ConfigItem){
        return httpClient.put('/sysConfigs/'+data.id+'/',data)
    }
}