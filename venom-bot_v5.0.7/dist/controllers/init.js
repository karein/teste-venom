"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const check_up_to_date_1 = require("./check-up-to-date");
const config_1 = require("../config");
const browser_1 = require("./browser");
const layers_1 = require("../api/layers");
async function connect(options) {
    const event = new layers_1.CallbackOnStatus();
    const mergeOptionsDefault = { ...config_1.defaultOptions, ...options };
    if (!!mergeOptionsDefault.session && mergeOptionsDefault.session.length) {
        const sessionName = mergeOptionsDefault.session;
        const replaceSession = sessionName.replace(/[^0-9a-zA-Zs]/g, '');
        if (replaceSession.length) {
            mergeOptionsDefault.session = replaceSession;
        }
        else {
            mergeOptionsDefault.session = config_1.defaultOptions.session;
        }
    }
    if (mergeOptionsDefault.updatesLog) {
        await (0, check_up_to_date_1.checkUpdates)();
    }
    const wpage = await (0, browser_1.initBrowser)(mergeOptionsDefault);
    if (typeof wpage !== 'boolean') {
        const page = await (0, browser_1.initWhatsapp)(mergeOptionsDefault, wpage);
        if (typeof page !== 'boolean') {
            console.log('New option');
        }
    }
}
exports.connect = connect;
//# sourceMappingURL=init.js.map