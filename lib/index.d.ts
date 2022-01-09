import ShopeeClient from './client';
export declare class ShopeeAffiliate {
    appId: string;
    appSecret: string;
    client: ShopeeClient;
    constructor(appId: string, appSecret: string);
    shortLink(originUrl: string, subIds: Array<string>): Promise<unknown>;
}
