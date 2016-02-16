import {bootstrap} from 'angular2/platform/browser';
import TimeTracker from './app'
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(TimeTracker, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
