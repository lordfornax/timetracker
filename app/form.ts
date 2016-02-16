import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {Form, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {TTInterface} from './services/interface';
import {ValidationService} from './services/validations';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'tt-form',
	templateUrl: 'views/form.jade',
	providers: [TTInterface],
	directives: [ROUTER_DIRECTIVES]
})

export class TTForm {
	form: ControlGroup;
	categories: Array<Object>;
	catIndex: String;
	apiError: String;

	constructor(fb: FormBuilder, public ttInterface: TTInterface, public router: Router) {
		var dFrom = new Date(),
			dTo = new Date(),
			dFromStr = "", dToStr = "";

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
			category: [-1, Validators.compose([Validators.required, ValidationService.lteZero])],
			subcategory: [-1, Validators.compose([Validators.required, ValidationService.lteZero])],
			from: [dFromStr, Validators.compose([Validators.required, ValidationService.isDateTime])],
			to: [dToStr, Validators.compose([Validators.required, ValidationService.isDateTime])],
			note: [""]
		});

		this.ttInterface.getCats()
			.subscribe(categories => this.categories = categories);
	}

	checkForm() {
		if (this.form.valid) {
			this.ttInterface.insertItem(this.form.value)
				.subscribe(res => this.router.navigateByUrl('/'), err => this.apiError = err.json().error);
		}
	}
}
