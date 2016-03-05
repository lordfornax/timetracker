var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.isDateTime = function (ctrl) {
        var dtRegexp = /[1|2][0-9]{3}\/[0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}(:[0-9]{1,2})?/, value = ctrl.value.replace(/-/g, "/"); // firefox miatt le kell cserelni
        if (!isNaN(new Date(value).getTime()) && dtRegexp.test(value)) {
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