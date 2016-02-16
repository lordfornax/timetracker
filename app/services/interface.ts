import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';

@Component({
	providers: [Http, Headers]
})

export class TTInterface {
	constructor(public http: Http) {}

	insertItem(item: Object) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('/api/items', JSON.stringify(item), {headers: headers})
			.map(res => res.json());
	}

	getItems() {
		return this.http.get('/api/items')
			.map(res => res.json());
	}

	getItemsByDate(date: Date) {
		return this.http.get('/api/items/' + date.getTime())
			.map(res => res.json());
	}

	delItem(itemId: String) {
		return this.http.delete('/api/items/' + itemId);
	}

	sendMail(email: String) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post('/api/sendmail', JSON.stringify({email: email}), {headers: headers})
			.map(res => res.json())
			.subscribe(res => console.log(res), err => console.error(err.json().error));
	}

	getCats() {
		return this.http.get('cats.json')
			.map(res => res.json())
	}
}
