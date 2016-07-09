import {RouterConfig} from '@angular/router';

import { CrudView } from './crud.view'
import { CreateView } from './create.view';
import { RemoveView, RemoveConfirmView } from './remove.view';

export const crudRoutes:RouterConfig = [
    {
        path: '',
        component: CrudView,
        children: [
            {path: '', pathMatch: 'full', redirectTo: '/create'},
            {path: 'create', component: CreateView},
            {
                path: 'remove',
                component: RemoveView,
                children: [
                    {path: '', pathMatch: 'full', redirectTo: '0'},
                    {path: ':id', component: RemoveConfirmView}
                ]
            }
        ]
    }
];
