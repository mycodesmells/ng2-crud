import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'

import { CrudView } from './crud/crud.view'
import { AboutView } from './about/about.view'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

@Component({
    selector: 'app',
    template: require('./app.html'),

    providers: [
        ROUTER_PROVIDERS
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})

@RouteConfig([
    {path: '/', redirectTo: ['Intro']},
    {path: '...', name: 'Crud-Main', component: CrudView},
    {path: '/about', name: 'About', component: AboutView},
    {path: '/intro', name: 'Intro', component: AboutView, data: {intro: true}, useAsDefault: true},
])
export class App implements OnInit {

    ngOnInit() {
        console.log('App start load');


    }

}
