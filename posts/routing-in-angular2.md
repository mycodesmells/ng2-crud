# Routing in Angular2

If you want to work with Angular2, you obviously are thinking about creating a SPA (yep, Single Page Application). But you cannot fit your whole application on one screen, right? This is where routing comes it. Let's see how it is done, and how to set up a small page with multiple views without page reload.

### Simple example

Our first example involves one top-level page with two views. We'd like to have some kind of navigation that allows us to move back and forth between the two. In our case we'd like to have one screen explaining what the app is about (_About_ page), and another with some actual business logic (which is not ready yet, so just a placeholder here).

_Simple_ in this case means that both pages have a common parent page - there is just one level of routing. So how exactly is this done in Angular2?

First of all, our root component needs to import two things:

- `RouteConfig` annotation that allows us to define what are the possible routes within given parent view,
- `ROUTER_DIRECTIVES` which allow us to create a quick navigation within our view's template
- `ROUTER_PROVIDERS` which allows Angular to enable routing within application (we won't touch it ourselves at this point)

We would like to have two pages, so we need to create two components representing each one. I prefer to name my view-components using `somename.view.ts` so that the imports suggest that this file actually represents a view. Our main view will look like this:

    // app/crud/crud.view.ts
    import { Component } from '@angular/core';

    @Component({
        selector: 'crud-view',
        template: require('./crud.view.html')
    })

    export class CrudView {
    }

And its HTML template (`app/crud/crud.view.html`):

    <section>
        <h3>CRUD</h3>

        <p>
            In this application you can:
        </p>
        <ul>
            <li>Create</li>
            <li>Remove</li>
            <li>Update</li>
            <li>Delete</li>
        </ul>
    </section>

The second view is built similarily, using `app/about/about.view.ts` and `app/about/about.view.html` files.

Now, to get it up and running, we need to inform our root component that it has to handle routing and move users to particular views depending on selected path. Our `app/app.ts` needs to have following changes:

    ...
    import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'
    import { CrudView } from './crud/crud.view'
    import { AboutView } from './about/about.view'
    ...
    @Component({
        ...
        providers: [
            ROUTER_PROVIDERS
        ],
        directives: [
            ROUTER_DIRECTIVES
        ]
    })

    @RouteConfig([
        {path: '/', name: 'Crud-Main', component: CrudView, useAsDefault: true},
        {path: '/about', name: 'About', component: AboutView}
    ])
    export class App implements OnInit {
        ...
    }

But this is not all! We also need to apply some changes to our HTML template. First of all, we need to define where should our subpages content be displayed. In order to do this we use `<router-outlet>` directive - our views will be shown directly below this tag. Second of all, we not want to have an easy navigation using Angular 2 ROUTER_DIRECTIVES. To do this we add a parameter (`[routerLink]="[PAGE_NAME]"`) to a common link. In the end, our root template looks accordingly:

    <main>
      <h1>ng2-crud</h1>
      <nav>
        <a [routerLink]="['Crud-Main']">Main Page</a>
        <a [routerLink]="['About']">About Page</a>
      </nav>

      <router-outlet></router-outlet>
    </main>

At this point, once we run the application (`npm start`), we should be able to see that we can go between pages without reloading:

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/crud-simple-page-1.png"/>

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/crud-simple-page-2.png"/>

### Nested routing

It was easy to set up simple routing, but it rarely is the case, that you don't have any nested routes. Let's add some subpages to our _CRUD_ page to see how is it different than the previous example.

First of all, our CRUD page needs to act as a root view for our new views, so it will look very similar to `app.ts` from the example above:

    // app/crud/crud.view.ts
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
    export class CrudView {}

Also the HTML template for this page needs to change, as we need to add `<router-outlet>` directive, and, optionally, pretty links for easy routing:

    <section>
        ...
        <ul>
            <li><a [routerLink]="['Create']">Create</a></li>
            <li><a [routerLink]="['Remove']">Remove</a></li>
        ...
        </ul>
        <router-outlet></router-outlet>
    </section>

The last thing we need to update is our root view. How come? The view itself need to know that one of the top-level routes will have its own subviews, so that the routing does not stop at this point:

    // app/app.ts
    ...
    @RouteConfig([
        {path: '...', name: 'Crud-Main', component: CrudView},
        {path: '/about', name: 'About', component: AboutView}
    ])
    export class App implements OnInit {
    ...
    }

As a result of all this, we can go not only between _CRUD_ an _About_ pages, but also between _Creating_ and _Removing_ pages (which are displayed below CRUD's list of operations, defined in `app/crud/crud.view.html`):

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/crud-nested-page-1.png"/>

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/crud-nested-page-2.png"/>

Source code of this example is available [on Github](https://github.com/mycodesmells/ng2-crud).
