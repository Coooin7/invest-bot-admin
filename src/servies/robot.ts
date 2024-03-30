import { httpClient } from "./http"
import { object_to_query_string } from "@/utils/common"
export enum TradeType {
    ALL = '', BUY = 'BUY', SELL = 'SELL', DEPOSIT = 'DEPOSIT', DRAW = 'DRAW'
}

export interface RoleInfo {
    id?: string,
    createdBy?: string,
    createdTime?: number,
    lastModifiedBy?: string,
    lastModifiedTime?: number,
    prefix: string,
    systemMessage: string,
    roleType: RoleType,
    desc?: string
}
export enum RoleType {
    COIN_ROBOT = 'COIN_ROBOT', FEI_SHU = 'FEI_SHU'
}
export class RobotService {

    static portfolioRank() {
        return httpClient.get<Array<PortfolioRank>>('/portfolios/rank/')
    }

    static portfolioDetails(userName: string) {
        return httpClient.get<Array<PortfolioDetails>>('/cryptoTrades/portfolioDetails/?user_name=' + userName)
    }

    static currencyHistoricalData(page: QueryPage, query?: HistoricalDataQueryArg) {
        const arg = Object.assign(page, query);
        const q = object_to_query_string(arg);
        return httpClient.get<{ content: Array<TradeDetails>, totalPages: 0 }>('/cryptoTrades/search/' + q)
    }

    static getTotalAmount(userName: string, coinId: string) {
        return httpClient.get<AccountInfo>(`/portfolios/${userName}/${coinId}/`)
    }

    static portfolioProfit(userName: string) {
        return httpClient.get<PortfolioProfitData>('/portfolios/cryptoPortfolioProfit/?user_name=' + userName)
    }

    static getRole(prefix: string) {
        return httpClient.get<RoleInfo>('/roleSettings/prefix/' + prefix+'/')
    }

    static getRoles(page: QueryPage, searchText: string) {
        const arg = Object.assign(page, { searchText });
        const q = object_to_query_string(arg);
        return httpClient.get<{ content: Array<TradeDetails>, totalPages: 0 }>('/roleSettings/search/' + q);
    }

    static deleteRole(id: string) {
        return httpClient.delete('/roleSettings/' + id);
    }

    static addRole(info: RoleInfo) {
        return httpClient.post('/roleSettings/', info);
    }

    static editRole(info: RoleInfo) {
        return httpClient.put('/roleSettings/' + info.id+'/', info);
    }

    static cryptoTrades(data: any) {
        return httpClient.post('/portfolios/deposit/', data);
    }

    static transaction() {
        return httpClient.post('/roleSettings/coinRobot/trades/')
    }

    static coinRobotTrade(prefix: string, prompt: string) {
        return httpClient.post(`/roleSettings/coinRobot/${prefix}/trade/`, { prompt })
    }
}