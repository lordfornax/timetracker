import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TTInterface} from './services/interface';

@Component({
	selector: 'tt-list',
	templateUrl: 'views/list.jade',
	providers: [TTInterface],
	directives: [ROUTER_DIRECTIVES]
})
export class TTList {
	items: Array<Object>;
	categories: Object;

	constructor(public ttInterface: TTInterface) {
		this.ttInterface.getCats()
			.subscribe(categories => this.categories = categories);

		this.refresh();
	}

	delItem(itemId: string) {
		if (confirm("Bizosan töröljem?")) {
			this.ttInterface.delItem(itemId)
				.subscribe(res => this.refresh(), err => console.error(err.json().error));
		}
	}

	refresh() {
		this.ttInterface.getItems()
			.subscribe(items => this.items = items);
	}
}
