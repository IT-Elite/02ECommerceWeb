﻿import { Component, Inject } from "@angular/core";
import { WINDOW } from '../window/window.service';

@Component({
    selector: 'app-footer',
    templateUrl:'app/navigation/footer.component.html'
})

export class FooterComponent {
    constructor(@Inject(WINDOW) private window: Window) { }

    host: string = this.window.location.host;       //Get the host through window injection
}