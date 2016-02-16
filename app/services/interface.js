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
var http_1 = require('angular2/http');
var TTInterface = (function () {
    function TTInterface(http) {
        this.http = http;
    }
    TTInterface.prototype.insertItem = function (item) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/items', JSON.stringify(item), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TTInterface.prototype.getItems = function () {
        return this.http.get('/api/items')
            .map(function (res) { return res.json(); });
    };
    TTInterface.prototype.getItemsByDate = function (date) {
        return this.http.get('/api/items/' + date.getTime())
            .map(function (res) { return res.json(); });
    };
    TTInterface.prototype.delItem = function (itemId) {
        return this.http.delete('/api/items/' + itemId);
    };
    TTInterface.prototype.sendMail = function (email) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('/api/sendmail', JSON.stringify({ email: email }), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); }, function (err) { return console.error(err.json().error); });
    };
    TTInterface.prototype.getCats = function () {
        return this.http.get('cats.json')
            .map(function (res) { return res.json(); });
    };
    TTInterface = __decorate([
        core_1.Component({
            providers: [http_1.Http, http_1.Headers]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TTInterface);
    return TTInterface;
})();
exports.TTInterface = TTInterface;
//# sourceMappingURL=interface.js.map