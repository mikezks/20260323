import { Component } from '@angular/core';

@Component({
  selector: 'app-my-flights',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">My Flights</h2>
      </div>

      <div class="card-body">
        <p>Find your booked flights here.</p>
      </div>
    </div>
  `,
  styles: ``
})
export class MyFlightsComponent {

}
