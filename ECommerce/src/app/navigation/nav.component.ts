import { Component,Inject } from "@angular/core";
import { WINDOW } from '../window/window.service';


@Component({
    selector: 'my-nav',
    templateUrl: 'app/navigation/nav.component.html'
})

export class navComponent {
    constructor(@Inject(WINDOW) private window: Window) { }
    host: string = this.window.location.host;       //Get the host through window injection

    refresh() {
        this.window.location.reload();
    }
}