import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
    template: `
              <my-nav>Loading nav...</my-nav>
              <router-outlet></router-outlet>
`
})
export class AppComponent  { 
	name = 'Angular'; 
}
