import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Person} from './Person';

@Injectable()
export class DatabaseService {

    constructor(private http:Http) {
    }

    //getPeople():Person[] {
    //    return [];
    //}

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
