"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeImg = void 0;
async function scrapeImg(page) {
    let click = await page
        .evaluate(() => {
        const buttonReload = document.querySelector('button');
        if (buttonReload != null) {
            buttonReload.click();
            return true;
        }
        return false;
    })
        .catch(() => false);
    if (click) {
        await page.waitForNavigation().catch(() => undefined);
    }
    const result = await page
        .evaluate(() => {
        const selectorImg = document.querySelector('canvas');
        const selectorUrl = selectorImg.closest('[data-ref]');
        const buttonReload = document.querySelector('button');
        if (buttonReload === null && selectorImg != null && selectorUrl != null) {
            let data = {
                base64Image: selectorImg.toDataURL(),
                urlCode: selectorUrl.getAttribute('data-ref')
            };
            return data;
        }
        else {
            return undefined;
        }
    })
        .catch(() => undefined);
    return result;
}
exports.scrapeImg = scrapeImg;
//# sourceMappingURL=scrape-img-qr.js.map