import {provideRouter, RouterConfig} from '@angular/router';

//import { CrudView } from './crud/crud.view'

import { crudRoutes } from './crud/crud.routes'
import { AboutView } from './about/about.view'

//import { CreateView } from './crud/create.view';
//import { RemoveView, RemoveConfirmView } from './crud/remove.view';

export const routes: RouterConfig = [
    //{path: '', component: CrudView, children: [
    //    {path: '', pathMatch: 'full', redirectTo: '/create'},
    //    {path: 'create', component: CreateView},
    //    {path: 'remove', component: RemoveView, children: [
    //        {path: '', pathMatch: 'full', redirectTo: '0'},
    //        {path: ':id', component: RemoveConfirmView}
    //    ]}
    //]},
    ...crudRoutes,
    {path: 'about', component: AboutView},
    {path: 'intro', component: AboutView, data: {intro: true}}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];

//{path: '', pathMatch: 'full', redirectTo: 'about'},

//@RouteConfig([
//    {path: '/create', name: 'Create', component: CreateView, useAsDefault: true},
//    {path: '/remove/...', name: 'Remove', component: RemoveView}
//])