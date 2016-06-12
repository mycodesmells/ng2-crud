import { Component } from '@angular/core';
import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated'

@Component({
    selector: 'remove-confirm-view',
    template: require('./remove.view.html')
})
class RemoveConfirmView {

    private itemID: string;

    constructor(private routeParams: RouteParams){
        this.itemID = routeParams.get('id');
    }

}

@Component({
    selector: 'remove-view',
    template: '<router-outlet></router-outlet>',
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {path: ':id', name: 'RemoveConfirm', component: RemoveConfirmView, useAsDefault: true}
])
export class RemoveView {
}
