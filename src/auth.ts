import * as crypto from 'crypto';

export default class Authentication {
  appId: string;

  appSecret: string;

  currentTimestamp: number;

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.currentTimestamp = Date.now();
  }

  signature(payload: string) : string {
    const hash = crypto.createHash('sha256');
    const signatureData = `${this.appId}${this.currentTimestamp}${payload}${this.appSecret}`;
    const requestSignature = hash.update(signatureData).digest('hex');
    return requestSignature;
  }
}
