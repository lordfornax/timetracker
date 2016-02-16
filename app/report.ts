import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TTInterface} from './services/interface';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';

interface CItem {
	category: number;
	subcategory: number;
	from: string;
	to: string;
	note: string;
}

@Component({
	selector: 'tt-report',
	templateUrl: 'views/report.jade',
	providers: [TTInterface],
	directives: [ROUTER_DIRECTIVES]
})

export class TTReport {
	form: ControlGroup;
	//date: Control;

	categories: Object;
	aggregated: Object;
	date: String;

	constructor(fb: FormBuilder, public ttInterface: TTInterface) {
		this.date = this.getFormatedDate(new Date());

		this.form = fb.group({
			date: [this.date]
		});

		this.ttInterface.getCats()
			.subscribe(categories => this.getItems(categories, this.date.toString()));


		//this.refresh();
	}

	getFormatedDate(d: Date) {
		return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
	}

	getItems(cats: Object, date: string) {
		this.categories = cats;
		this.date = this.getFormatedDate(new Date(date));
		this.ttInterface.getItemsByDate(new Date(date))
			.subscribe(items => this.aggregate(items));
	}

	sendMail() {
		var email = "";

		if (email = prompt("Hova küldjem?")) {
			this.ttInterface.sendMail(email);
		}
	}

	print() {
		window.print();
	}

	aggregate(items: Array<CItem>) {
		var self:any = this,
			aggregated:Array<any> = [];

		items.forEach(function (item) {
			var c = item.category,
				sc = item.subcategory,
				catIndex = -1,
				scatIndex = -1;

			aggregated.forEach(function (ai, i) {
				if (ai.cat === c) {
					catIndex = i;

					ai.subcats.forEach(function (asi: any, ii: number) {
						if (asi.scat === sc) {
							scatIndex = ii;
						}
					})
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
			if (item.note) aggregated[catIndex].subcats[scatIndex].notes.push(item.note);
		});

		this.aggregated = aggregated;
	}

	toTimeStr(time: number) {
		var sec = parseInt(time.toString(), 10),
		h = Math.floor(sec / 3600),
		m = Math.floor((sec - (h * 3600)) / 60),
		s = sec - (h * 3600) - (m * 60);

		h = parseInt(("0" + h).slice(-2));
		m = parseInt(("0" + m).slice(-2));
		s = parseInt(("0" + s).slice(-2));

		return h + ':' + m + ':' + s;
	}

	refresh(time: string) {
		this.getItems(this.categories, time);
	}
}
