import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated'

import { CreateView } from './create.view';
import { RemoveView } from './remove.view';

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    directives: [
        ROUTER_DIRECTIVES
    ]
})

@RouteConfig([
    {path: 'create', name: 'Create', component: CreateView, useAsDefault: true},
    {path: 'remove', name: 'Remove', component: RemoveView}
])
export class CrudView {
}
