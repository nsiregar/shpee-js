export default class ShopeeClient {
    baseUrl: string;
    appId: string;
    appSecret: string;
    constructor(appId: string, appSecret: string);
    post(payload: string): Promise<unknown>;
    private buildHeaders;
}
