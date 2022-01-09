import fetch from 'node-fetch';
import Authentication from './auth';

export default class ShopeeClient {
  baseUrl: string = 'https://open-api.affiliate.shopee.co.id/graphql';

  appId: string;

  appSecret: string;

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
  }

  async post(payload: string) {
    const requestHeaders = this.buildHeaders(payload);
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: payload,
      headers: requestHeaders,
    });

    const data = await response.json();
    return data;
  }

  private buildHeaders(payload: string) {
    const auth = new Authentication(this.appId, this.appSecret);
    const headers = {
      Authorization: `SHA256 Credential=${auth.appId}, Signature=${auth.signature(payload)}, Timestamp=${auth.currentTimestamp}`,
      'Content-Type': 'application/json',
    };
    return headers;
  }
}
