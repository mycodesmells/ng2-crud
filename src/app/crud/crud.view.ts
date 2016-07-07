import { Component } from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated'
import 'rxjs/Rx';

import {DatabaseService} from './database/Database.service';

import { CreateView } from './create.view';
import { RemoveView } from './remove.view';

@Component({
    selector: 'crud-view',
    template: require('./crud.view.html'),
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        DatabaseService
    ]
})
@RouteConfig([
    {path: '/create', name: 'Create', component: CreateView, useAsDefault: true},
    {path: '/remove/...', name: 'Remove', component: RemoveView}
])
export class CrudView {

    constructor(private router:Router, private db:DatabaseService) {
        this.fetchPeople();
    }

    fetchPeople() {
        this.db.getPeople()
            .subscribe(
                p => console.log(p),
                err => console.error(err),
                () => console.log("Display anyway!")
            );
        this.db.getPeople()
            .forEach(p => console.log(p))
            .catch(err => console.error(err));

        console.log('People:', this.db.getPeople());
    }

    removeItem(id:string) {
        console.log(`Removing #${id}`);
        this.router.navigate(['Remove', 'RemoveConfirm', {id: id}]);
    }

}
