# Routing in Angular2 - Part 3

See [Part 1](http://mycodesmells.com/post/routing-in-angular2/), [Part 2](http://mycodesmells.com/post/routing-in-angular2-part2/) of routing tutorial.

We have already covered basic top-level routing, nested views, and handling parameters in dynamic paths. Is there anything more that you might want to know about routing in Angular 2? Of course it is, otherwise this would be a pretty stupid post. I hope it's not, as it introduces two tricks to take your routing skills to the next level.

### Manual transition between pages

So far we've learned how to make a transition between pages by making a user click on a link like this:

    <li><a [routerLink]="['Create']">Create</a></li>

But what if we want to make such transition programatically? For example, we want to make some request to the server, and depending on its response we need to redirect to another view? Fortunately, there is an easy way to do just that.

On our _CRUD_ page we'll create a button that will trigger a transition to _Removing_ page with some ID:

    // crud.view.html
    ...
    <p>
        Go to Remove item no <input type="text" [(ngModel)]="removeID"><button (click)="removeItem(removeID)">Go</button>
    </p>
    ...

As you can see, we used `[(ngModel)]` attribute to bind input's value with a variable (`removeID`). Now we need to create a function (`removeItem`) in _CRUD_ view, as it is bound with a button via `(click)` event:

    // crud.view.ts
    ...
    export class CrudView {
        removeItem(id: string) {
            console.log(`Removing #${id}`);
        }
    }

You can now test, that whatever you put into a text input is passed into this function. How do we perform a transition then? We first need to inject `Router` into `CrudView` constructor:

    // crud.view.ts
    ...
    export class CrudView {
        constructor(private router: Router) {}
        ...
    }

This looks strange, but the trick is whenever you pass a provider into a component's constructor, it is stored as an attribute of this component. Thanks to this, we can use `Router` instance using `this.router` in any of our functions within `CrudView`. And we will:

    export class CrudView {
        ...
        removeItem(id: string) {
            this.router.navigate(['Remove', 'RemoveConfirm', {id: id}]);
        }
    }

To perform our long-awaited transition between pages, we use `Router.navigate(..)` function, and we pass the same argument as we would with `[routerLink]` directive in an HTML template. Once we do this, we can enjoy our dynamic navigation:

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/dynamic-route-transition.png"/>

### Additional route data

Second thing I wanted to show as a trick in Angular 2 routing is passing extra parameters to routes. This might seem to be a little head-scratcher, but in fact recently I needed to use this and you might some day too. The idea is to have two paths handled by the same component (view), but there is a small difference between its behaviour between those two cases. In my case it was a simple page showing a video with a button. The difference was that on an intro page the button should say _Skip_, but when a user opens the same page later, it should say _Back_. Makes sense, right? So how do we do that?

First of all, we need to create a separate entry in `RouteConfig` stating that there will be two paths handled by the same component. In our case, let's clone our _About_ page into _Intro_ page, and display the information about an extra parameter in its HTML template. Routes configuration will now look like this:

    // app.ts
    @RouteConfig([
        {path: '/', redirectTo: ['Intro']},
        {path: '...', name: 'Crud-Main', component: CrudView},
        {path: '/about', name: 'About', component: AboutView},
        {path: '/intro', name: 'Intro', component: AboutView, data: {intro: true}}
    ])
    export class App implements OnInit {
    ...

As you can see, our new path gets an additional parameter (`data`) that is an object of any data you want to pass into its component. Additionally, we created a placeholder route to handle the root path (`/`) to redirect users to an intro page. Then, in the `AboutView` we need to handle this object using `RouteData` provider. As we just want to change some text displayed later in the HTML template, we can do this inside contructor:

    // about.view.ts
    export class AboutView {
        private introText: string;

        constructor(private routeData: RouteData) {
            if (routeData.data['intro']) {
                this.introText = 'This is an introduction page!';
            } else {
                this.introText = 'Not an intro any more...';
            }
        }
    }

Last, but not least, we update our HTML template:

    // about.view.html
    <section>
        <h3>
            About ng2-crud
            <small>{{introText}}</small>
        </h3>
        <p>
            This is a sample CRUD application created using Angular 2.
        </p>
    </section>

And it works (notice URL change):

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/routing-data-intro.png"/>

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/routing-data-not-intro.png"/>

**Note** transition is not performed correctly when going direcly between two views handled by the same component. This rarely is the case, so I don't think this should cause you any trouble, yet it's good to have it in mind.

Source code of this example is available [on Github](https://github.com/mycodesmells/ng2-crud).
