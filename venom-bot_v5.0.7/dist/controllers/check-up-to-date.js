"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdates = void 0;
const latest_version_1 = __importDefault(require("latest-version"));
const semver_1 = require("../utils/semver");
const boxen_1 = __importDefault(require("boxen"));
const chalk_1 = __importDefault(require("chalk"));
const { version } = require('../../package.json');
let updatesChecked = false;
async function checkUpdates() {
    if (!updatesChecked) {
        updatesChecked = true;
        return await checkVenomVersion();
    }
}
exports.checkUpdates = checkUpdates;
async function checkVenomVersion() {
    try {
        const latest = await (0, latest_version_1.default)('venom-bot');
        if ((0, semver_1.upToDate)(version, latest)) {
            console.log(chalk_1.default.red("You're up to date 🎉🎉🎉"));
        }
        else {
            console.log('There is a new version available');
            logUpdateAvailable(version, latest);
        }
    }
    catch (_a) {
        console.log('Unable to access: "https://www.npmjs.com", check your internet');
        return false;
    }
}
function logUpdateAvailable(current, latest) {
    // prettier-ignore
    const newVersionLog = `There is a new version of ${chalk_1.default.bold(`venom`)} ${chalk_1.default.gray(current)} ➜  ${chalk_1.default.bold.green(latest)}\n` +
        `Update your package by running:\n\n` +
        `${chalk_1.default.bold('\>')} ${chalk_1.default.blueBright('npm update venom-bot')}`;
    console.log((0, boxen_1.default)(newVersionLog, { padding: 1 }));
    console.log(`For more info visit: ${chalk_1.default.underline('https://github.com/orkestral/venom/blob/master/Update.md')}\n`);
}
//# sourceMappingURL=check-up-to-date.js.map