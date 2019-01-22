import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
    template: `
              <my-nav>Loading nav...</my-nav>
              <router-outlet></router-outlet>
              <app-footer></app-footer>
`
})
export class AppComponent  { 
	name = 'Angular'; 
}
