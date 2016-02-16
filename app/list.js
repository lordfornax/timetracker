var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/Rx');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var interface_1 = require('./services/interface');
var TTList = (function () {
    function TTList(ttInterface) {
        var _this = this;
        this.ttInterface = ttInterface;
        this.ttInterface.getCats()
            .subscribe(function (categories) { return _this.categories = categories; });
        this.refresh();
    }
    TTList.prototype.delItem = function (itemId) {
        var _this = this;
        if (confirm("Bizosan töröljem?")) {
            this.ttInterface.delItem(itemId)
                .subscribe(function (res) { return _this.refresh(); }, function (err) { return console.error(err.json().error); });
        }
    };
    TTList.prototype.refresh = function () {
        var _this = this;
        this.ttInterface.getItems()
            .subscribe(function (items) { return _this.items = items; });
    };
    TTList = __decorate([
        core_1.Component({
            selector: 'tt-list',
            templateUrl: 'views/list.jade',
            providers: [interface_1.TTInterface],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [interface_1.TTInterface])
    ], TTList);
    return TTList;
})();
exports.TTList = TTList;
//# sourceMappingURL=list.js.map