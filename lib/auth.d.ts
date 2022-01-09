export default class Authentication {
    appId: string;
    appSecret: string;
    currentTimestamp: number;
    constructor(appId: string, appSecret: string);
    signature(payload: string): string;
}
