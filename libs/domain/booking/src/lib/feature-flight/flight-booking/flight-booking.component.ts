import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent, provideNavigationService } from '@flight-demo/shared/navigation';


@Component({
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet,
    NavigationComponent
  ],
  template: `
    <app-navigation class="nav-standalone" />

    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [
    provideNavigationService([
      {
        route: 'flight/search',
        label: 'Flight Search',
        icon: 'flight'
      },
      {
        route: 'airport',
        label: 'Airports',
        icon: 'flight'
      }
    ])
  ]
})
export class FlightBookingComponent {}
