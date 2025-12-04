import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '@flight-demo/domain/booking-api-boarding';
import { FlightService } from '../../logic-flight/data-access/flight.service';
import { FlightFilter } from '../../logic-flight/model/flight-filter';
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
  private flightService = inject(FlightService);

  protected filter = {
    from: 'Paris',
    to: 'New York',
    urgent: false
  };
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights: Flight[] = [];

  protected search(filter: FlightFilter): void {
    this.filter = filter;

    if (!this.filter.from || !this.filter.to) {
      return;
    }

    this.flightService.find(
      this.filter.from, this.filter.to, this.filter.urgent
    ).subscribe(
      flights => this.flights = flights
    );
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

    this.flights = this.flights.map(
      flight => flight.id === newFlight.id ? newFlight : flight
    );
  }

  protected reset(): void {
    this.flights = [];
  }
}
