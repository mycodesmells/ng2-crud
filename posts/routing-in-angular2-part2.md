# Routing in Angular2 - Part 2

See [Part 1](http://mycodesmells.com/post/routing-in-angular2/) of routing tutorial.

So far we've seen some basic ways to define routing in our application, but all the paths we've visited were static. There were no variables, no dynamic data and so on. What if we want to display some information about an item from the database, represented by given ID? This post explains how to this.

Suppose that we want to modify our _Removing_ view, so that we ask our users to confirm, that they actually want to remove an item represented by some ID. In order to do that, we need to make changes to `RouteConfig` part of its parent view:

    ...
    @Component({
       ...
    })
    @RouteConfig([
        {path: 'create', name: 'Create', component: CreateView, useAsDefault: true},
        {path: 'remove/...', name: 'Remove', component: RemoveView}
    ])
    export class CrudView {
    }

We now define `Remove` to be a parent route to yet another view. Why do we want to do this? It's because we don't want to handle our ID parameter in `CrudView`, but move this logic to `RemoveView` component.

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

As you can see, we now expect to see something after `remove/` in the URL, and this _something_ (`:id`) is an id we'll use to identify an item being removed. For the sake of our example we will have just one _subpath_ for _Removing_ view, and it will display confirmation of removing an item. Because our view does not need to contain anything more than the content of `RemoveConfirmView`, its template can be defined inline as `<router-outlet></router-outlet>`.

As there is just one subroute, can keep both _parent_ `RemoveView` and its only child, `RemoveConfirmView` in the same file. Because of the nature of Webpack/Angular2 processing, the subroute must be defined above its parent, so that it's known to the compilator when `RouteConfig` is being built:

    import { Component } from '@angular/core';
    import { RouteParams, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated'

    @Component({
        selector: 'remove-confirm-view',
        template: require('./remove.view.html')
    })
    class RemoveConfirmView {
        ...
    }

    @Component({
        ...
    })
    @RouteConfig([
        ...
    ])
    export class RemoveView {
    }


Now we need to handle this parameter on the other side, that is within _Removing_ view. We do this via `RouteParams` provider injected into view's constructor:

    ...
    class RemoveConfirmView {
        private itemID: string;

        constructor(private routeParams: RouteParams){
            this.itemID = routeParams.get('id');
        }
    }
    ...

As you can see, we just `get` a parameter using its name and save its value to our view's attribute. This can be accessed, eg. in the template:

    // remove.view.html
    <section>
        Are you sure you want to remove item #{{itemID}}?
    </section>

Now you can also notice, that our link to _Removing_ view from _CRUD_ view is no longer valid, as we don't pass an `id` there. Also we cannot access `RemoveConfirmView` directly from _CRUD_'s template, but we can do this step-by-step, passing by `RemoveView`:

    <section>
        <h3>CRUD</h3>
        ...
            <li>Remove
                <a [routerLink]="['Remove', 'RemoveConfirm', {id: '0'}]">
                    Item #0
                </a>
            </li>
        ...
        <router-outlet></router-outlet>
    </section>

In order to access our page displaying confirmation for removing item #0, we need to pass three parameters to the `routerLink` attribute: parent path name, child path name and an object with parameters necessary for child page to be displayed properly.

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/crud-dynamic-path.png"/>

Source code of this example is available [on Github](https://github.com/mycodesmells/ng2-crud).
