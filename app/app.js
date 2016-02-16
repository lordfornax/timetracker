var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('angular2/router');
var core_1 = require('angular2/core');
var form_1 = require('./form');
var list_1 = require('./list');
var report_1 = require('./report');
var TimeTracker = (function () {
    function TimeTracker() {
    }
    TimeTracker = __decorate([
        core_1.Component({
            selector: 'timetracker',
            templateUrl: '../views/app.jade',
            directives: [form_1.TTForm, list_1.TTList, router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/', component: list_1.TTList, name: 'Home', useAsDefault: true },
            { path: '/add', component: form_1.TTForm, name: 'Add' },
            { path: '/report', component: report_1.TTReport, name: 'Report' }
        ]), 
        __metadata('design:paramtypes', [])
    ], TimeTracker);
    return TimeTracker;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimeTracker;
//# sourceMappingURL=app.js.map