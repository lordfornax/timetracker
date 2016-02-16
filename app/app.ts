import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Component} from 'angular2/core';
import {TTForm} from './form';
import {TTList} from './list';
import {TTReport} from './report';

@Component({
	selector: 'timetracker',
	templateUrl: '../views/app.jade',
	directives: [TTForm, TTList, ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/', component: TTList, name: 'Home', useAsDefault: true },
	{ path: '/add', component: TTForm, name: 'Add' },
	{ path: '/report', component: TTReport, name: 'Report' }
])

export default class TimeTracker {
	constructor() {}
}
