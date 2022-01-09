export default class ShortLink {
    originUrl: string;
    subIds: Array<string>;
    constructor(originUrl: string, subIds: Array<string>);
    payload(): {
        query: string;
    };
}
