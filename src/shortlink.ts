import { URL } from 'url';

function cleanUrl(originUrl: string) {
  const url = new URL(originUrl);
  const cleanedUrl = `${url.origin}${url.pathname}`;
  return cleanedUrl;
}

export default class ShortLink {
  originUrl: string;

  subIds: Array<string>;

  constructor(originUrl: string, subIds: Array<string>) {
    this.originUrl = cleanUrl(originUrl);
    this.subIds = subIds;
  }

  payload() {
    const graphqlQuery = `mutation{
      generateShortLink(input: {
        originUrl: ${this.originUrl},
        subIds: ${JSON.stringify(this.subIds)}
      }){
        shortLink
      }
    }`;
    const payloadQuery = { query: graphqlQuery };
    return payloadQuery;
  }
}
