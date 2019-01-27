import { Component, Inject } from "@angular/core";
import { WINDOW } from '../window/window.service';

@Component({
    selector: 'app-sitemap',
    templateUrl:'app/sitemap/sitemap.component.html'
})

export class SitemapComponent {
    constructor(@Inject(WINDOW) private window: Window) { }
    host: string = this.window.location.host;       //Get the host through window injection
}