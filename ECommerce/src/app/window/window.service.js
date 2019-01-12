"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.WINDOW = new core_1.InjectionToken('window');
var windowProvider = {
    provide: exports.WINDOW,
    useFactory: function () { return window; }
};
exports.WINDOW_PROVIDERS = [
    windowProvider
];
//# sourceMappingURL=window.service.js.map