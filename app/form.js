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
var common_1 = require('angular2/common');
var interface_1 = require('./services/interface');
var validations_1 = require('./services/validations');
var router_1 = require('angular2/router');
var TTForm = (function () {
    function TTForm(fb, ttInterface, router) {
        var _this = this;
        this.ttInterface = ttInterface;
        this.router = router;
        var dFrom = new Date(), dTo = new Date(), dFromStr = "", dToStr = "";
        dTo.setHours(dTo.getHours() + 1);
        dFromStr =
            dFrom.getFullYear() + "-" +
                ("0" + (dFrom.getMonth() + 1)).slice(-2) + "-" +
                ("0" + dFrom.getDate()).slice(-2) + " " +
                ("0" + dFrom.getHours()).slice(-2) + ":" +
                ("0" + dFrom.getMinutes()).slice(-2);
        dToStr =
            dTo.getFullYear() + "-" +
                ("0" + (dTo.getMonth() + 1)).slice(-2) + "-" +
                ("0" + dTo.getDate()).slice(-2) + " " +
                ("0" + dTo.getHours()).slice(-2) + ":" +
                ("0" + dTo.getMinutes()).slice(-2);
        this.form = fb.group({
            category: [-1, common_1.Validators.compose([common_1.Validators.required, validations_1.ValidationService.lteZero])],
            subcategory: [-1, common_1.Validators.compose([common_1.Validators.required, validations_1.ValidationService.lteZero])],
            from: [dFromStr, common_1.Validators.compose([common_1.Validators.required, validations_1.ValidationService.isDateTime])],
            to: [dToStr, common_1.Validators.compose([common_1.Validators.required, validations_1.ValidationService.isDateTime])],
            note: [""]
        });
        this.ttInterface.getCats()
            .subscribe(function (categories) { return _this.categories = categories; });
    }
    TTForm.prototype.checkForm = function () {
        var _this = this;
        if (this.form.valid) {
            this.ttInterface.insertItem(this.form.value)
                .subscribe(function (res) { return _this.router.navigateByUrl('/'); }, function (err) { return _this.apiError = err.json().error; });
        }
    };
    TTForm = __decorate([
        core_1.Component({
            selector: 'tt-form',
            templateUrl: 'views/form.jade',
            providers: [interface_1.TTInterface],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, interface_1.TTInterface, router_1.Router])
    ], TTForm);
    return TTForm;
})();
exports.TTForm = TTForm;
//# sourceMappingURL=form.js.map