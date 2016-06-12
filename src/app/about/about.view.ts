import { Component } from '@angular/core';
import { RouteData } from '@angular/router-deprecated';

@Component({
    selector: 'about-view',
    template: require('./about.view.html')
})
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
