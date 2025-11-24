import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Passenger } from '../../logic-passenger/model/passenger';
import { PassengerStore } from '../../logic-passenger/state/passenger.signal.store';


@Component({
  selector: 'app-passenger-search',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {
  private store = inject(PassengerStore);

  firstname = '';
  lastname = 'Smith';
  passengers = this.store.passengerEntities;
  selectedPassenger?: Passenger;

  search(): void {
    if (!(this.firstname || this.lastname)) return;

    this.store.loadPassengers({
      firstName: this.firstname,
      name: this.lastname
    });
  }

  select(passenger: Passenger): void {
    this.selectedPassenger = this.selectedPassenger === passenger ? undefined : passenger;
  }
}
