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
const chrome_version_1 = __importDefault(require("chrome-version"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_config_1 = require("../config/puppeteer.config");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const WAuserAgente_1 = require("../config/WAuserAgente");
const sleep_1 = require("../utils/sleep");
const os = __importStar(require("os"));
const axios_1 = __importDefault(require("axios"));
const create_config_1 = require("../config/create-config");
const unzipper = __importStar(require("unzipper"));
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
    try {
        if (!options) {
            throw new Error(`Missing required options`);
        }
        if (!options.folderNameToken) {
            options.folderNameToken = create_config_1.defaultOptions.folderNameToken;
        }
        if (!options.session) {
            options.session = create_config_1.defaultOptions.session;
        }
        const folderSession = options.mkdirFolderToken
            ? path.join(path.resolve(process.cwd(), options.mkdirFolderToken, options.folderNameToken, options.session))
            : path.join(path.resolve(process.cwd(), options.folderNameToken, options.session));
        if (!fs.existsSync(folderSession)) {
            fs.mkdirSync(folderSession, { recursive: true });
        }
        const folderMulidevice = options.mkdirFolderToken
            ? path.join(path.resolve(process.cwd(), options.mkdirFolderToken, options.folderNameToken))
            : path.join(path.resolve(process.cwd(), options.folderNameToken));
        if (!fs.existsSync(folderMulidevice)) {
            fs.mkdirSync(folderMulidevice, { recursive: true });
        }
        fs.chmodSync(folderMulidevice, '777');
        fs.chmodSync(folderSession, '777');
        options.puppeteerOptions = {
            userDataDir: folderSession,
            ignoreHTTPSErrors: true
        };
        puppeteer_config_1.puppeteerConfig.chromiumArgs.push(`--user-data-dir=${folderSession}`);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.folderSession = folderSession;
async function getGlobalChromeVersion() {
    try {
        const chromePath = ChromeLauncher.Launcher.getInstallations().pop();
        if (chromePath) {
            const version = await (0, chrome_version_1.default)(chromePath);
            return version;
        }
    }
    catch (e) {
        console.error('Error retrieving Chrome version:', e);
    }
    return null;
}
async function checkPathDowload(extractPath) {
    try {
        const pathChrome = path.join(extractPath, 'chrome-win', 'chrome.exe');
        if (!fs.existsSync(pathChrome)) {
            return false;
        }
        return pathChrome;
    }
    catch (_a) {
        return false;
    }
}
async function initBrowser(options, spinnies) {
    var _a, _b, _c, _d;
    try {
        // Use stealth plugin to avoid being detected as a bot
        puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
        const checkFolder = folderSession(options);
        if (!checkFolder) {
            throw new Error(`Error executing client session info`);
        }
        if (options.headless !== 'new' && options.headless !== false) {
            throw new Error('Now use only headless: "new" or false');
        }
        const chromePath = getChromeExecutablePath();
        // Set the executable path to the path of the Chrome binary or the executable path provided
        let executablePath = (_b = (_a = getChrome()) !== null && _a !== void 0 ? _a : puppeteer_extra_1.default.executablePath()) !== null && _b !== void 0 ? _b : chromePath;
        console.log('Path Google-Chrome: ', executablePath);
        const extractPath = path.join(process.cwd(), 'chrome');
        const checkPath = await checkPathDowload(extractPath);
        if (!executablePath || !isChromeInstalled(executablePath)) {
            if (!checkPath) {
                spinnies.add(`browser-info-${options.session}`, {
                    text: `...`
                });
                spinnies.fail(`browser-info-${options.session}`, {
                    text: `Could not find the google-chrome browser on the machine!`
                });
                spinnies.add(`browser-status-${options.session}`, {
                    text: `Downloading browser...`
                });
                // Download the latest version of Chrome
                const downloadUrl = `https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2F1000027%2Fchrome-win.zip?generation=1651780728332948&alt=media`;
                const zipFilePath = path.join(process.cwd(), 'chrome', 'chrome-win.zip');
                if (!fs.existsSync(extractPath)) {
                    fs.mkdirSync(extractPath, { recursive: true });
                }
                fs.chmodSync(extractPath, '777');
                spinnies.add(`browser-path-${options.session}`, {
                    text: `...`
                });
                spinnies.succeed(`browser-path-${options.session}`, {
                    text: `Path download Chrome: ${zipFilePath}`
                });
                const response = await axios_1.default.get(downloadUrl, {
                    responseType: 'arraybuffer'
                });
                // Verifica se o status da resposta é 200 (OK)
                if (response.status === 200) {
                    await fs.promises.writeFile(zipFilePath, response.data);
                    spinnies.succeed(`browser-status-${options.session}`, {
                        text: `Download completed.`
                    });
                    spinnies.add(`browser-status-${options.session}`, {
                        text: `Extracting Chrome: ${extractPath}`
                    });
                    const zip = await unzipper.Open.file(zipFilePath);
                    await zip.extract({ path: extractPath });
                    spinnies.succeed(`browser-status-${options.session}`, {
                        text: `Chrome extracted successfully.`
                    });
                    const pathChrome = path.join(extractPath, 'chrome-win', 'chrome.exe');
                    if (!fs.existsSync(pathChrome)) {
                        throw new Error(`Error no Path download Chrome`);
                    }
                    const checkDowl = await checkPathDowload(extractPath);
                    if (!checkDowl) {
                        throw new Error(`Error no Path download Chrome`);
                    }
                    const folderChrom = path.join(extractPath, 'chrome-win');
                    fs.chmodSync(folderChrom, '777');
                    executablePath = pathChrome;
                    spinnies.add(`browser-path-${options.session}`, {
                        text: `...`
                    });
                    spinnies.succeed(`browser-path-${options.session}`, {
                        text: `Execute Path Chrome: ${executablePath}`
                    });
                }
                else {
                    throw new Error('Error download file Chrome.');
                }
            }
            else {
                executablePath = checkPath;
            }
        }
        let chromeVersion = '';
        let versionTimeout;
        if (executablePath.includes('google-chrome')) {
            chromeVersion = await getGlobalChromeVersion();
        }
        else {
            const browser = await puppeteer_extra_1.default.launch({
                executablePath,
                headless: 'new'
            });
            versionTimeout = setTimeout(() => {
                browser.close();
                throw new Error('This browser version has problems');
            }, 10000);
            chromeVersion = await browser.version();
            clearTimeout(versionTimeout);
            await browser.close();
        }
        if (chromeVersion) {
            console.log('Chrome Version:', chromeVersion);
        }
        const extras = { executablePath };
        if (Array.isArray(options.addProxy) && options.addProxy.length) {
            const proxy = options.addProxy[Math.floor(Math.random() * options.addProxy.length)];
            const args = (_c = options.browserArgs) !== null && _c !== void 0 ? _c : puppeteer_config_1.puppeteerConfig.chromiumArgs;
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
            headless: true,
            // headless: options.headless,
            devtools: options.devtools,
            args: (_d = options.browserArgs) !== null && _d !== void 0 ? _d : puppeteer_config_1.puppeteerConfig.chromiumArgs,
            ...options.puppeteerOptions,
            ...extras
        };
        if (options.browserWS && options.browserWS !== '') {
            return await puppeteer_extra_1.default.connect({ browserWSEndpoint: options.browserWS });
        }
        else {
            console.log('aqui');
            return await puppeteer_extra_1.default.launch(launchOptions);
        }
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.initBrowser = initBrowser;
function getChromeExecutablePath() {
    const platform = os.platform();
    switch (platform) {
        case 'win32':
            return getWindowsChromeExecutablePath();
        case 'darwin':
            return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        case 'linux':
            return '/usr/bin/google-chrome';
        default:
            console.error('Could not find browser.');
            return null;
    }
}
function getWindowsChromeExecutablePath() {
    const programFilesPath = process.env.ProgramFiles || '';
    const programFilesx86Path = process.env['ProgramFiles(x86)'] || '';
    if (programFilesx86Path) {
        return path.join(programFilesx86Path, 'Google', 'Chrome', 'Application', 'chrome.exe');
    }
    else if (programFilesPath) {
        return path.join(programFilesPath, 'Google', 'Chrome', 'Application', 'chrome.exe');
    }
    else {
        return null;
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
            .catch(() => { });
        if (infoLog) {
            callback(infoLog);
        }
        await (0, sleep_1.sleep)(200);
    }
}
exports.statusLog = statusLog;
/**
 * Retrieves chrome instance path
 */
function getChrome() {
    try {
        const chromeInstalations = ChromeLauncher.Launcher.getInstallations();
        return chromeInstalations[0];
    }
    catch (error) {
        console.error('Error checking Chrome installation:', error);
        return undefined;
    }
}
function isChromeInstalled(executablePath) {
    try {
        fs.accessSync(executablePath);
        return true;
    }
    catch (_a) {
        return false;
    }
}
//# sourceMappingURL=browser.js.map