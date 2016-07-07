# HTTP requests in Angular 2

Writing views using HTML and CSS is rather easy. But building front-end of your applications is so much more than that. Your back-end may be performing all kinds of magic, but it's your view's responsibility to get this data somehow and display to the user. Let's take a look on how to make HTTP requests with services in Angular 2.

### Services

We first need to start by creating a service, which will be providing your components with with data. And the word _providing_ is very important here, as the service has to be defined as a _provider_ to anything that would rely on it. Say, we want our view, `crud.view.ts` to use newly created service - `DatabaseService`:

    // app/crud/crud.view.ts
    ...
    import {DatabaseService} from './database/Database.service';
    ...

    @Component({
        ...
        providers: [
            DatabaseService
        ]
    })
    ...
    export class CrudView {
        ...
        constructor(private router:Router, private db:DatabaseService) {}
        ...
    }

Then we can create a service that will implement a function, responsible for returning a list of people. First, for the sake of Typescript and its main feature (yeah, types!) let's define `Person`:

    // app/crud/database/Person.ts
    export interface Person {
        id: number;
        name: string;
        age: number;
    }

Now we can have a service that provide some useful API:

    // app/crud/database/Database.service.ts
    import { Injectable } from '@angular/core';

    import {Person} from './Person';

    @Injectable()
    export class DatabaseService {

        getPeople(): Person[] {
            return [];
        }

    }

Note that we need to define it as an `Injectable` in order to be visible via `providers` annotation property to the components. Don't forget about it, or you'll spend significant time figuring out why your awesome code does not work.

Finally, our component can use our dummy service, for example in its constructor:

    constructor(private router:Router, private db:DatabaseService) {
        console.log('People:', db.getPeople());
    }

Result should not come to you as a surprise:

    People: []

### No promises

Well, that was dumb, right? So let's spice it up with an HTTP request to a semi-real-production server. I'm using [json-server](https://www.npmjs.com/package/json-server) for this kind of stuff - just pass a JSON file with some data and it's being served for your front-end to use! My JSON is very small and simple:

    // data/data.json
    {
      "people": [
        {
          "id": 1,
          "name": "John Doe",
          "age": 33
        },
        {
          "id": 2,
          "name": "Ann Karls",
          "age": 21
        }
      ]
    }

Now we need to make our service reach out to the server and fetch data. You might be thinking about Promises right now, but we live in the future now, and as Java Script has already introduced Observables, we'll use those.

First change we need to make is altering our service API. We will no longer be returning an array of `Person` but instead we provide an `Observable`. More on it a bit later:

    // app/crud/database/Database.service.ts
    import { Observable } from 'rxjs/Observable';
    ...
    getPeople(): Observable<Person[]> {}
    ...

Now we need to alter its implementation to make actual HTTP calls. The API for `Http` is very easy and available to read in an awesome [Angular docs](https://angular.io/docs/ts/latest/guide/server-communication.html). We also need to import another awesome library [RxJS](https://github.com/Reactive-Extensions/RxJS) that allow us to make some transformations on `Observable` objects, such as mapping. In fact, we need `map` function so much, as we want to parse data coming from the server in order to use it as JS objects later on. We also should add error handling - I chose to use the one from Angular 2 docs, as it seems to be pretty neat:

    // app/crud/database/Database.service.ts
    ...
    import { Http } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/Rx';

    ...
    export class DatabaseService {

        constructor(private http:Http) {
        }

        getPeople():Observable<Person[]> {
            return this.http.get('http://localhost:3000/people')
                .map(res => res.json())
                .catch(this.handleError);
        }

        private handleError(error:any) {
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        }

    }

### The other end

Changing an API requires an update on the other side, that is in our component. We no longer receive an array, so how should we handle incoming data?

We can take an easy path and just treat that data *as* an array. Yes we can!

    this.db.getPeople()
        .forEach(p => console.log(p))
        .catch(err => console.error(err));

The second approach uses `subscribe` method that takes three arguments: success handler, error handler and _always_ handler (which runs regardless of the outcome):

    this.db.getPeople()
        .subscribe(
            p => console.log(p),
            err => console.error(err),
            () => console.log("Display anyway!")
        );

What is the difference between the two? According to [this source (via Stackoverflow)](http://stackoverflow.com/a/35399823/1632346), `subscribe` allows you to cancel listening (if it takes too much time for example), whereas `forEach` forces you to choose all-in approach. Either you handle everything, of you simply fail...
