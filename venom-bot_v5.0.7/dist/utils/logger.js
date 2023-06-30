"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLogger = exports.formatLabelSession = void 0;
const winston_1 = require("winston");
exports.formatLabelSession = (0, winston_1.format)((info) => {
    const parts = [];
    if (info.session) {
        parts.push(info.session);
        delete info.session;
    }
    if (info.type) {
        parts.push(info.type);
        delete info.type;
    }
    if (parts.length) {
        let prefix = parts.join(':');
        info.message = `[${prefix}] ${info.message}`;
    }
    return info;
});
exports.defaultLogger = (0, winston_1.createLogger)({
    level: 'info',
    levels: winston_1.config.npm.levels,
    format: winston_1.format.combine((0, exports.formatLabelSession)(), winston_1.format.colorize(), winston_1.format.padLevels(), winston_1.format.simple()),
    //   defaultMeta: { service: 'venon-bot' },
    transports: [new winston_1.transports.Console()]
});
//# sourceMappingURL=logger.js.map