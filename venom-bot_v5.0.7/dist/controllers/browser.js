"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusLog = exports.initBrowser = exports.folderSession = exports.getWhatsappPage = exports.initWhatsapp = void 0;
const ChromeLauncher = __importStar(require("chrome-launcher"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_config_1 = require("../config/puppeteer.config");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const WAuserAgente_1 = require("../config/WAuserAgente");
const sleep_1 = require("../utils/sleep");
async function initWhatsapp(options, browser) {
    const waPage = await getWhatsappPage(browser);
    if (!waPage) {
        return false;
    }
    try {
        await waPage.setUserAgent(WAuserAgente_1.useragentOverride);
        const hasUserPass = typeof options.userPass === 'string' && options.userPass.length;
        const hasUserProxy = typeof options.userProxy === 'string' && options.userProxy.length;
        const hasAddProxy = Array.isArray(options.addProxy) && options.addProxy.length;
        if (hasUserPass && hasUserProxy && hasAddProxy) {
            await waPage.authenticate({
                username: options.userProxy,
                password: options.userPass
            });
        }
        await waPage.goto(puppeteer_config_1.puppeteerConfig.whatsappUrl, {
            waitUntil: 'domcontentloaded'
        });
        waPage.on('pageerror', ({ message }) => {
            const erroLogType1 = message.includes('RegisterEffect is not a function');
            const erroLogType2 = message.includes('[Report Only]');
            if (erroLogType1 || erroLogType2) {
                waPage.evaluate(() => {
                    localStorage.clear();
                    window.location.reload();
                });
            }
        });
        await browser.userAgent();
        return waPage;
    }
    catch (error) {
        console.error(error);
        await waPage.close();
        return false;
    }
}
exports.initWhatsapp = initWhatsapp;
async function getWhatsappPage(browser) {
    try {
        const pages = await browser.pages();
        if (pages.length !== 0) {
            return pages[0];
        }
        else {
            return await browser.newPage();
        }
    }
    catch (_a) {
        return false;
    }
}
exports.getWhatsappPage = getWhatsappPage;
function folderSession(options) {
    const folderSession = path.join(path.resolve(process.cwd(), options.mkdirFolderToken, options.folderNameToken, options.session));
    if (!fs.existsSync(folderSession)) {
        fs.mkdirSync(folderSession, {
            recursive: true
        });
    }
    const folderMulidevice = path.join(path.resolve(process.cwd(), options.mkdirFolderToken, options.folderNameToken));
    if (!fs.existsSync(folderMulidevice)) {
        fs.mkdirSync(folderMulidevice, {
            recursive: true
        });
    }
    fs.chmodSync(folderMulidevice, '777');
    fs.chmodSync(folderSession, '777');
    options.puppeteerOptions = {
        userDataDir: folderSession,
        ignoreHTTPSErrors: true
    };
    puppeteer_config_1.puppeteerConfig.chromiumArgs.push(`--user-data-dir=${folderSession}`);
}
exports.folderSession = folderSession;
async function initBrowser(options) {
    var _a, _b, _c;
    try {
        folderSession(options);
        // Set the executable path to the path of the Chrome binary or the executable path provided
        const executablePath = (_a = getChrome()) !== null && _a !== void 0 ? _a : puppeteer_extra_1.default.executablePath();
        console.log('Path Chrome: ', executablePath);
        const extras = { executablePath };
        // Use stealth plugin to avoid being detected as a bot
        puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
        if (Array.isArray(options.addProxy) && options.addProxy.length) {
            const proxy = options.addProxy[Math.floor(Math.random() * options.addProxy.length)];
            const args = (_b = options.browserArgs) !== null && _b !== void 0 ? _b : puppeteer_config_1.puppeteerConfig.chromiumArgs;
            args.push(`--proxy-server=${proxy}`);
        }
        if (Array.isArray(options.addBrowserArgs) &&
            options.addBrowserArgs.length) {
            options.addBrowserArgs.forEach((arg) => {
                if (!puppeteer_config_1.puppeteerConfig.chromiumArgs.includes(arg)) {
                    puppeteer_config_1.puppeteerConfig.chromiumArgs.push(arg);
                }
            });
        }
        const launchOptions = {
            headless: options.headless,
            devtools: options.devtools,
            args: (_c = options.browserArgs) !== null && _c !== void 0 ? _c : puppeteer_config_1.puppeteerConfig.chromiumArgs,
            ...options.puppeteerOptions,
            ...extras
        };
        if (options.browserWS && options.browserWS !== '') {
            return await puppeteer_extra_1.default.connect({ browserWSEndpoint: options.browserWS });
        }
        else {
            return await puppeteer_extra_1.default.launch(launchOptions);
        }
    }
    catch (_d) {
        return false;
    }
}
exports.initBrowser = initBrowser;
function getChrome() {
    try {
        const chromeInstalations = ChromeLauncher.Launcher.getInstallations();
        return chromeInstalations[0];
    }
    catch (error) {
        return undefined;
    }
}
async function statusLog(page, spinnies, session, callback) {
    while (true) {
        if (page.isClosed()) {
            try {
                spinnies.fail(`whatzapp-intro-${session}`, {
                    text: 'Erro intro'
                });
            }
            catch (_a) { }
            break;
        }
        const infoLog = await page
            .evaluate(() => {
            const target = document.getElementsByClassName('_2dfCc');
            if (target && target.length) {
                if (target[0]['innerText'] !== 'WhatsApp' &&
                    target[0]['innerText'] !== window['statusInicial']) {
                    window['statusInicial'] = target[0]['innerText'];
                    return window['statusInicial'];
                }
            }
        })
            .catch(() => undefined);
        if (infoLog) {
            callback(infoLog);
        }
        await (0, sleep_1.sleep)(200);
    }
}
exports.statusLog = statusLog;
//# sourceMappingURL=browser.js.map