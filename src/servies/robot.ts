import type { BigNumber } from "@ethersproject/bignumber"
import { httpClient } from "./http"
import { object_to_query_string } from "@/utils/common"
export enum TradeType {
    ALL = '', BUY = 'BUY', SELL = 'SELL', DEPOSIT = 'DEPOSIT', DRAW = 'DRAW'
}
interface PortfolioRank {
    userName: string,
    amount: BigNumber
}
interface PortfolioDetails {
    userName: string,
    coinId: string,
    quantity: BigNumber,
    costPrice: BigNumber,
    currentPrice: BigNumber,
    profit: BigNumber
}
interface QueryPage {
    page: number,
    size?: number | 20,
    sort?: string[]
}
interface TradeDetails {
    userName: string,
    coinId: string,
    quantity: BigNumber,
    costPrice: BigNumber,
    currentPrice: BigNumber,
    profit: BigNumber
}
interface HistoricalDataQueryArg {
    userName?: string,
    coinId?: string,
    tradeType?: TradeType,
}
interface PortfolioProfitData {
    totalCost: BigNumber,
    totalProfit: BigNumber,
    profitMargin: string,
    portfolioDetailsVOList: TradeDetails[]
}
export interface RoleInfo {
    id?:string,
    createdBy?: string,
    createdTime?: number,
    lastModifiedBy?: string,
    lastModifiedTime?: number,
    prefix: string,
    systemMessage: string,
    roleType: RoleType
}
export enum RoleType {
    COIN_ROBOT = 'COIN_ROBOT', FEI_SHU = 'FEI_SHU'
}
export class RobotService {

    static portfolioRank() {
        return httpClient.get<Array<PortfolioRank>>('/cryptoTrades/portfolioRank')
    }

    static portfolioDetails(userName: string) {
        return httpClient.get<Array<PortfolioDetails>>('/cryptoTrades/portfolioDetails?userName=' + userName)
    }

    static currencyHistoricalData(page: QueryPage, query?: HistoricalDataQueryArg) {
        const arg = Object.assign(page, query);
        const q = object_to_query_string(arg);
        return httpClient.get<{ content: Array<TradeDetails>, totalPages: 0 }>('/cryptoTrades/search' + q)
    }

    static getTotalAmount(userName: string, coinId: string) {
        const q = object_to_query_string({ userName, coinId });
        return httpClient.get<BigNumber>('/cryptoTrades/coin/getTotalAmount' + q)
    }

    static portfolioProfit(userName: string) {
        return httpClient.get<PortfolioProfitData>('/cryptoTrades/cryptoPortfolioProfit?userName=' + userName)
    }

    static getRole(prefix: string) {
        return httpClient.get<RoleInfo>('/roleSettings/byPrefix?prefix=' + prefix)
    }

    static getRoles(page: QueryPage, searchText: string) {
        const arg = Object.assign(page, { searchText });
        const q = object_to_query_string(arg);
        return httpClient.get<{ content: Array<TradeDetails>, totalPages: 0 }>('/roleSettings' + q);
    }

    static deleteRole(id: string) {
        return httpClient.delete('/roleSettings/' + id);
    }

    static addRole(info: RoleInfo) {
        return httpClient.post('/roleSettings', info);
    }

    static editRole(info: RoleInfo) {
        return httpClient.put('/roleSettings/' + info.id, info);
    }
}