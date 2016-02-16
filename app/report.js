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
var common_1 = require('angular2/common');
var TTReport = (function () {
    function TTReport(fb, ttInterface) {
        var _this = this;
        this.ttInterface = ttInterface;
        this.date = this.getFormatedDate(new Date());
        this.form = fb.group({
            date: [this.date]
        });
        this.ttInterface.getCats()
            .subscribe(function (categories) { return _this.getItems(categories, _this.date.toString()); });
        //this.refresh();
    }
    TTReport.prototype.getFormatedDate = function (d) {
        return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    };
    TTReport.prototype.getItems = function (cats, date) {
        var _this = this;
        this.categories = cats;
        this.date = this.getFormatedDate(new Date(date));
        this.ttInterface.getItemsByDate(new Date(date))
            .subscribe(function (items) { return _this.aggregate(items); });
    };
    TTReport.prototype.sendMail = function () {
        var email = "";
        if (email = prompt("Hova küldjem?")) {
            this.ttInterface.sendMail(email);
        }
    };
    TTReport.prototype.print = function () {
        window.print();
    };
    TTReport.prototype.aggregate = function (items) {
        var self = this, aggregated = [];
        items.forEach(function (item) {
            var c = item.category, sc = item.subcategory, catIndex = -1, scatIndex = -1;
            aggregated.forEach(function (ai, i) {
                if (ai.cat === c) {
                    catIndex = i;
                    ai.subcats.forEach(function (asi, ii) {
                        if (asi.scat === sc) {
                            scatIndex = ii;
                        }
                    });
                }
            });
            if (catIndex < 0) {
                aggregated.push({
                    cat: c,
                    catText: self.categories[c].name,
                    timespent: 0,
                    subcats: []
                });
                catIndex = aggregated.length - 1;
            }
            if (scatIndex < 0) {
                aggregated[catIndex].subcats.push({
                    scat: sc,
                    scatText: self.categories[c].subcategories[sc],
                    notes: [],
                    timespent: 0
                });
                scatIndex = aggregated[catIndex].subcats.length - 1;
            }
            aggregated[catIndex].subcats[scatIndex].timespent += Math.round((new Date(item.to).getTime() - new Date(item.from).getTime()) / 1000 / 60 / 60 * 10) / 10;
            aggregated[catIndex].subcats[scatIndex].timespentStr = self.toTimeStr(aggregated[catIndex].subcats[scatIndex].timespent * 60 * 60);
            aggregated[catIndex].timespent += aggregated[catIndex].subcats[scatIndex].timespent;
            aggregated[catIndex].timespentStr = self.toTimeStr(aggregated[catIndex].timespent * 60 * 60);
            if (item.note)
                aggregated[catIndex].subcats[scatIndex].notes.push(item.note);
        });
        this.aggregated = aggregated;
    };
    TTReport.prototype.toTimeStr = function (time) {
        var sec = parseInt(time.toString(), 10), h = Math.floor(sec / 3600), m = Math.floor((sec - (h * 3600)) / 60), s = sec - (h * 3600) - (m * 60);
        h = parseInt(("0" + h).slice(-2));
        m = parseInt(("0" + m).slice(-2));
        s = parseInt(("0" + s).slice(-2));
        return h + ':' + m + ':' + s;
    };
    TTReport.prototype.refresh = function (time) {
        this.getItems(this.categories, time);
    };
    TTReport = __decorate([
        core_1.Component({
            selector: 'tt-report',
            templateUrl: 'views/report.jade',
            providers: [interface_1.TTInterface],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, interface_1.TTInterface])
    ], TTReport);
    return TTReport;
})();
exports.TTReport = TTReport;
//# sourceMappingURL=report.js.map