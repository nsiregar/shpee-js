'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fetch = require('node-fetch');
var crypto = require('crypto');
var url = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Authentication = /** @class */ (function () {
    function Authentication(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.currentTimestamp = Date.now();
    }
    Authentication.prototype.signature = function (payload) {
        var hash = crypto__namespace.createHash('sha256');
        var signatureData = "".concat(this.appId).concat(this.currentTimestamp).concat(payload).concat(this.appSecret);
        var requestSignature = hash.update(signatureData).digest('hex');
        return requestSignature;
    };
    return Authentication;
}());

var ShopeeClient = /** @class */ (function () {
    function ShopeeClient(appId, appSecret) {
        this.baseUrl = 'https://open-api.affiliate.shopee.co.id/graphql';
        this.appId = appId;
        this.appSecret = appSecret;
    }
    ShopeeClient.prototype.post = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = this.buildHeaders(payload);
                        return [4 /*yield*/, fetch__default["default"](this.baseUrl, {
                                method: 'POST',
                                body: payload,
                                headers: requestHeaders,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ShopeeClient.prototype.buildHeaders = function (payload) {
        var auth = new Authentication(this.appId, this.appSecret);
        var headers = {
            Authorization: "SHA256 Credential=".concat(auth.appId, ", Signature=").concat(auth.signature(payload), ", Timestamp=").concat(auth.currentTimestamp),
            'Content-Type': 'application/json',
        };
        return headers;
    };
    return ShopeeClient;
}());

function cleanUrl(originUrl) {
    var url$1 = new url.URL(originUrl);
    var cleanedUrl = "".concat(url$1.origin).concat(url$1.pathname);
    return cleanedUrl;
}
var ShortLink = /** @class */ (function () {
    function ShortLink(originUrl, subIds) {
        this.originUrl = cleanUrl(originUrl);
        this.subIds = subIds;
    }
    ShortLink.prototype.payload = function () {
        var graphqlQuery = "mutation{\n      generateShortLink(input: {\n        originUrl: ".concat(this.originUrl, ",\n        subIds: ").concat(JSON.stringify(this.subIds), "\n      }){\n        shortLink\n      }\n    }");
        var payloadQuery = { query: graphqlQuery };
        return payloadQuery;
    };
    return ShortLink;
}());

var ShopeeAffiliate = /** @class */ (function () {
    function ShopeeAffiliate(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.client = new ShopeeClient(this.appId, this.appSecret);
    }
    ShopeeAffiliate.prototype.shortLink = function (originUrl, subIds) {
        return __awaiter(this, void 0, void 0, function () {
            var link, payload, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        link = new ShortLink(originUrl, subIds);
                        payload = JSON.stringify(link.payload);
                        return [4 /*yield*/, this.client.post(payload)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    return ShopeeAffiliate;
}());

exports.ShopeeAffiliate = ShopeeAffiliate;
