var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.isDateTime = function (ctrl) {
        var dtRegexp = /[1|2][0-9]{3}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}(:[0-9]{1,2})?/;
        if (!isNaN(new Date(ctrl.value).getTime()) && dtRegexp.test(ctrl.value)) {
            return null;
        }
        return { 'isDateTime': 'Helytelen időpont formátum!' };
    };
    ValidationService.lteZero = function (ctrl) {
        if (+ctrl.value >= 0) {
            return null;
        }
        return { 'invalid': true };
    };
    return ValidationService;
})();
exports.ValidationService = ValidationService;
//# sourceMappingURL=validations.js.map