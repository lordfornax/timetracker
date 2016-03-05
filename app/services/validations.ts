import {Control} from 'angular2/common';

export class ValidationService {
	static isDateTime(ctrl: Control) {
		var dtRegexp = /[1|2][0-9]{3}\/[0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}(:[0-9]{1,2})?/,
			value = ctrl.value.replace(/-/g, "/"); // firefox miatt le kell cserelni

		if (!isNaN(new Date(value).getTime()) && dtRegexp.test(value)) {
			return null;
		}

		return {'isDateTime': 'Helytelen időpont formátum!'};
	}

	static lteZero(ctrl: Control) {
		if (+ctrl.value >= 0) {
			return null;
		}

		return {'invalid': true};
	}
}
