import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../logic-flight/model/flight';
import { injectTicketsFacade } from '../../logic-flight/state/facade';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';
import { FlightFilterComponent } from '../../ui-flight/flight-filter/flight-filter.component';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();

  protected filter = signal({
    from: 'Paris',
    to: 'New York',
    urgent: false
  });
  protected readonly route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  constructor() {
    effect(() => console.log(this.route()));
    
    // Explicit Effect
    effect(() => {
      this.filter();
      untracked(() => this.search());
    });

    // Signal Update-Behavior
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Frankfurt' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Madrid' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Barcelona' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Rome' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Athens' }));
    console.log(this.filter().from);
    this.filter.update(curr => ({ ...curr, from: 'Oslo' }));
    console.log(this.filter().from);

    // Glitch-free Behavior
    const counter = signal(0);
    const isEven = computed(() => counter() % 2 === 0);
    effect(() => console.log({
      counter: untracked(() => counter()),
      isEven: isEven()
    }));
    setInterval(() => counter.update(curr => curr + 2), 2_000);
  }

  protected search(): void {
    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
