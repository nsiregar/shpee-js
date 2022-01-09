# shpee

Javascript Wrapper for Shopee Affiliate API

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install `shpee`.

```bash
npm install shpee
```

## Usage

```javascript
# shopee_client.js

import { ShopeeAffiliate } from 'shpee';


const APP_ID = "12345"
const APP_SECRET = "APPSECRET"

let url = "https://shopee.co.id/some-long-url-from-shopee-product-page?params=with-tracking-params"
let subIds = ["ProductName", "Twitter"]

let client = new ShopeeAffiliate(APP_ID, APP_SECRET)
client.shortlink(url, subIds)
```

It will return JSON object from response