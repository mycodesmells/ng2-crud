# New Router API in Angular 2

See posts on previous API: [Part 1](http://mycodesmells.com/post/routing-in-angular2/), [Part 2](http://mycodesmells.com/post/routing-in-angular2-part2/), [Part 3](http://mycodesmells.com/post/routing-in-angular2-part3/).

If you paid attention carefully to my previous posts on Angular 2 routing, you may have noticed that I've been using deprecated router package. Obviously we don't want to do that in our projects, so with a new router documentation published, we take a look on an updated API.

### Routes definition

In previous versions of Router, we needed to declare routes for each component that acted as a parent route to any other:

    // src/app/app.ts
    ...
    import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'
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
        {path: '/', redirectTo: ['Intro']},
        {path: '...', name: 'Crud-Main', component: CrudView},
        {path: '/about', name: 'About', component: AboutView},
        {path: '/intro', name: 'Intro', component: AboutView, data: {intro: true}, useAsDefault: true},
    ])
    export class App implements OnInit {
        ...
    }

With an updated API, we need to define all routes (preferably in a separate file):

    // src/app/app.routes.ts
    import {provideRouter, RouterConfig} from '@angular/router';
    ...
    export const routes: RouterConfig = [
        ...
        {path: 'about', component: AboutView},
        ...
    ];
    export const APP_ROUTER_PROVIDERS = [
        provideRouter(routes)
    ];

which we use in application's initialization:

    // src/main.ts
    ...
    // Routes configuration
    import { APP_ROUTER_PROVIDERS } from './app/app.routes';
    ...
    bootstrap(App, [
        APP_ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ]).catch(err => console.error(err));

### Redirecting

There are some properties that a path must have, in order to achieve different things. First of all, if you want to redirect given path to another we need to use two properties: `redirectTo` and `pathMatch`. First one defines which (absolute) path will be used as redirection destination, while `pathMatch`, which has two available values (`prefix` or `full`) determines whether we should redirect exactly given `path`, or all paths that start with `path` value:

    {path: '', pathMatch: 'full', redirectTo: '/create'}, // only '/' path redirects to '/create'
    {path: '/error', pathMatch: 'prefix', redirectTo: '/create'}, // e.g. '/error/1' path redirects to '/create'

### Extra route data and parameters

Using extra parameters (as described in [this post](http://mycodesmells.com/post/routing-in-angular2-part3/)) is used exacly the same way in the path:

    {path: 'intro', component: AboutView, data: {intro: true}}

But using this data is different. From now on we use `ActivatedRoute` service which stores all data describing current route. `data` is stored as an `Observable<Data>` (which is an `Observable` of string to `any` map) and can be used like this:

        constructor(private route: ActivatedRoute) {
            route.data.subscribe(data => {
                // do stuff with 'data'
            });
        }

By the way, using route parameters (like `itemID` in `/items/0` path) looks identical:

    constructor(private route: ActivatedRoute){
        route.params.subscribe(params => {
            // do stuff with 'params'
        });
    }

### Nesting routes

Defining nested routes was really quite a pain in the ass in the previous Router API - defining them all over the place, ading strange `...` as parent route values was just awful, [remember](http://mycodesmells.com/post/routing-in-angular2-part2/)?

Now we have all routes in one place, plus whenever we want to nest some paths inside other we just put them (as an array) in `children` property of their parent. Sounds logical, right? Just take a look:

    export const routes: RouterConfig = [
        {path: '', component: CrudView, children: [
            {path: '', pathMatch: 'full', redirectTo: '/create'},
            {path: 'create', component: CreateView},
            {path: 'remove', component: RemoveView, children: [
                {path: '', pathMatch: 'full', redirectTo: '0'},
                {path: ':id', component: RemoveConfirmView}
            ]}
        ]},
        {path: 'about', component: AboutView},
        {path: 'intro', component: AboutView, data: {intro: true}}
    ];

The only thing that is a head scratcher is puttinh *all* of your paths in the same place, if you have eg. dozens of them. A workaround is very simple - first we define some paths in one file, e.g. all CRUD-related paths in `crud.routes.ts`:

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

and then import them in main routes file, then use *spread* operator (awesome ES2015!) which extracts our routes just as if they were put inline:

    import { crudRoutes } from './crud/crud.routes'

    export const routes: RouterConfig = [
        ...crudRoutes,
        {path: 'about', component: AboutView},
        {path: 'intro', component: AboutView, data: {intro: true}}
    ];

### Summary

If you haven't used an old Router yet, you don't have to worry about switching your habits. If you have, you will really appreciate the new way of doing stuff. I was pleasantly surprised when I saw all the changes, as they are simpler and more logical to use. Kudos to Angular 2 team for really thinking this through and providing us with a well-prepared API for a crucial thing in any web application which is routing.

Source code of this example is available [on Github](https://github.com/mycodesmells/ng2-crud).
