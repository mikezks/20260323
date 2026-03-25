import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { entityConfig, removeAllEntities, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { FlightService } from '../data-access/flight.service';
import { addMinutes } from '@flight-demo/shared/core';


export interface BoookingState {
  filter: FlightFilter;
  basket: Record<number, boolean>;
}

export const initialBookingState: BoookingState = {
  filter: {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  },
  basket: {
    3: true,
    5: true
  }
};

export const flightConfig = entityConfig({
  entity: type<Flight>(),
  collection: 'flight',
  // selectId: flight => flight.id
});

/* const entityState = {
  entities: {
    3: { from, to },
    5: { from, to },
  },
  ids: [5, 3]
} */

export const BookingStore = signalStore(
  // DI Config
  { providedIn: 'root' },
  // State
  withState(initialBookingState),
  withEntities(flightConfig),
  withComputed(store => ({
    delayedFlights: () => store.flightEntities().filter(flight => flight.delayed),
    flightRoute: () => 'From ' + store.filter().from + ' to ' + store.filter().to + '.'
  })),
  withProps(() => ({
    _flightService: inject(FlightService),
  })),
  // Updater
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store,
      setAllEntities(flights, flightConfig)
    ),
    delayFlight: (id: number, min = 5) => patchState(store,
      updateEntity({ id, changes: flight => ({
        date: addMinutes(flight.date, min)
      })}, flightConfig)
    ),
    resetFlights: () => patchState(store,
      removeAllEntities(flightConfig)
    ),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
  })),
  // Side-Effects
  withMethods(store => ({
    loadFlights: rxMethod<FlightFilter>(pipe(
      switchMap(filter => store._flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => store.setFlights(flights),
          error: err => console.error(err)
        })
      ))
    ))
  })),
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter),
  }))
);