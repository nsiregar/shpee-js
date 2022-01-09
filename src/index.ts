import ShopeeClient from './client';
import ShortLink from './shortlink';

export class ShopeeAffiliate {
  appId: string;

  appSecret: string;

  client: ShopeeClient;

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.client = new ShopeeClient(this.appId, this.appSecret);
  }

  async shortLink(originUrl: string, subIds: Array<string>) {
    const link = new ShortLink(originUrl, subIds);
    const payload = JSON.stringify(link.payload);
    const resp = await this.client.post(payload);
    return resp;
  }
}
