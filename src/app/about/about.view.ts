import { Component } from '@angular/core';
import { RouteData } from '@angular/router-deprecated';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'about-view',
    template: require('./about.view.html')
})
export class AboutView {

    private introText: string;

    constructor(private route: ActivatedRoute) {
        route.data.subscribe(data => {
            var isIntro = data['intro'];

            if (isIntro) {
                this.introText = 'This is an introduction page!';
            } else {
                this.introText = 'Not an intro any more...';
            }
        })
    }

}
