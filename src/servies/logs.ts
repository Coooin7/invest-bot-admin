import { object_to_query_string } from "@/utils/common";
import { httpClient } from "./http";

interface LogSearchArg {
    userName?: string,
    startTime?: string,
    endTime?: string,
    chainId?: string
}
export class AgentLogs {
    static search(page: QueryPage, query: LogSearchArg) {
        const arg = Object.assign(page, query);
        if (arg.startTime) {
            arg.startTime = new Date(arg.startTime).getTime().toString()
        }
        if (arg.endTime) {
            arg.endTime = new Date(arg.endTime).getTime().toString()
        }
        const q = object_to_query_string(arg);
        return httpClient.get('/agentLogs/search/' + q)
    }

    static export(query: LogSearchArg) {
        const arg = { ...query };
        if (arg.startTime) {
            arg.startTime = new Date(arg.startTime).getTime().toString()
        }
        if (arg.endTime) {
            arg.endTime = new Date(arg.endTime).getTime().toString()
        }
        const q = object_to_query_string(arg);
        window.open(import.meta.env.VITE_API_BASE + '/agentLogs/export/' + q)
    }
}