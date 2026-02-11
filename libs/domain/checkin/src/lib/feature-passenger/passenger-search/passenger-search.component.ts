import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Passenger, PassengerFilter } from '../../logic-passenger/model/passenger';
import { PassengerStore } from '../../logic-passenger/state/passenger.signal.store';


@Component({
  selector: 'app-passenger-search',
  imports: [
    RouterLink,
    FormField
  ],
  templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {
  private store = inject(PassengerStore);

  private passengerFilter = signal<PassengerFilter>({
    firstname: '',
    lastname: 'Smith'
  });
  protected filterForm = form(this.passengerFilter, filterPath => {
    required(filterPath.firstname, {
      message: 'Firstname or lastname need to be entered.',
      when: ({ valueOf }) => !valueOf(filterPath.lastname)
    });
    required(filterPath.lastname, {
      message: 'Firstname or lastname need to be entered.',
      when: ({ valueOf }) => !valueOf(filterPath.firstname)
    });
  });
  passengers = this.store.passengerEntities;
  selectedPassenger = signal<Passenger | undefined>(undefined);

  search(event: Event): void {
    event.preventDefault();
    this.store.loadPassengers({
      firstName: this.filterForm.firstname().value(),
      name: this.filterForm.lastname().value()
    });
  }

  select(passenger: Passenger): void {
    this.selectedPassenger.update(curr => curr === passenger ? undefined : passenger);
  }
}
