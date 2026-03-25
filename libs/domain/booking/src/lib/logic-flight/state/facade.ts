import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Flight } from "../model/flight";
import { FlightFilter } from "../model/flight-filter";
import { ticketActions } from "./redux/actions";
import { ticketFeature } from "./redux/reducer";


export function injectTicketsFacade() {
  const store = inject(Store);

  return {
    flights: store.selectSignal(ticketFeature.selectFlights),
    flights$: store.select(ticketFeature.selectFlights),
    search: (filter: FlightFilter) =>
      store.dispatch(ticketActions.flightsLoad(filter)),
    update: (flight: Flight) =>
      store.dispatch(ticketActions.flightUpdate({ flight })),
    reset: () =>
      store.dispatch(ticketActions.flightsClear())
  };
}
