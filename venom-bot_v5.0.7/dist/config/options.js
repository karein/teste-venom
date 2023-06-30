"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
const puppeteer_config_1 = require("./puppeteer.config");
exports.defaultOptions = {
    session: 'name-session',
    folderNameToken: 'tokens',
    disableWelcome: false,
    BrowserFetcher: true,
    updatesLog: true,
    headless: true,
    logQR: true,
    devtools: false,
    mkdirFolderToken: '',
    browserWS: '',
    browserArgs: puppeteer_config_1.puppeteerConfig.chromiumArgs,
    addBrowserArgs: [],
    autoClose: 120000,
    addProxy: []
};
//# sourceMappingURL=options.js.map