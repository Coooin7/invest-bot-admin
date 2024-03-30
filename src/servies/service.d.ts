interface QueryPage {
    page: number,
    size?: number | 20,
    sort?: string[]
}
interface PortfolioRank {
    userName: string,
    amount: string
}
interface PortfolioDetails {
    userName: string,
    coinId: string,
    quantity: string,
    costPrice: string,
    currentPrice: string,
    profit: string
}

interface TradeDetails {
    userName: string,
    coinId: string,
    coinCount: string,
    costAmount: string,
    currentPrice: string,
    profit: string,
    soldAmount: string,
}
interface HistoricalDataQueryArg {
    userName?: string,
    coinId?: string,
    tradeType?: TradeType,
}
interface PortfolioProfitData {
    totalCost: string,
    totalProfit: string,
    profitMargin: string,
    portfolioDetailsVoList: TradeDetails[]
}
interface AccountInfo {
    coinId: string,
    coinCount: string,
    costPrice: string
}

interface ConfigQuery {
    key?: string,
    remark?: string
}

interface ConfigItem {
    id?: string,
    createdBy?: string,
    createdTime?: number,
    lastModifiedBy?: string,
    lastModifiedTime?: number,
    key?: string,
    value: string,
    disabled: boolean,
    remark: string
}

declare module 'camelize';
declare module 'snakeize';

interface LlmKeyQuery {
    apiKey?: string,
    disabled?: boolean|string
}

interface llmKeyItem {
    id?: string,
    createdBy?: string
    createdTime?: number
    lastModifiedBy?: string
    lastModifiedTime?: number
    apiKey: string
    firstTime: number
    usageCount: number
    disabled: boolean
    reason: string
    maxDailyUses: number
}