import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, ResourceRef, Signal, inject, resource } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";
import { Passenger } from "../model/passenger";


@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private http = inject(HttpClient);

  passengers: Passenger[] = [];
  private baseUrl = `https://demo.angulararchitects.io/api`;

  load(firstname?: string, lastname?: string): void {
    this.find(firstname, lastname).subscribe({
      next: (passenger) => {
        this.passengers = passenger;
      },
      error: (err) => console.error('Error loading passengers', err),
    });
  }

  find(firstname?: string, lastname?: string): Observable<Passenger[]> {
    const url = [this.baseUrl, 'passenger'].join('/');

    const params = new HttpParams()
      .set('firstName', firstname ?? '')
      .set('name', lastname ?? '');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Passenger[]>(url, { params, headers });
  }

  findById(id: number): Observable<Passenger> {
    const url = [this.baseUrl, 'passenger'].join('/');
    const params = new HttpParams()
      .set('id', id);

    return this.http.get<Passenger>(url, { params });
  }

  findAsResource(filter: Signal<{ firstname: string, lastname: string }>): ResourceRef<Passenger[] | undefined> {
    return rxResource({
      params: filter,
      stream: ({ params: filter }) => this.find(filter.firstname, filter.lastname)
    });
  }

  findByIdAsResource(id: Signal<number>): ResourceRef<Passenger | undefined> {
    return resource({
      params: id,
      loader: ({ params: id, abortSignal }) => fetch(
        [this.baseUrl, 'passenger', id].join('/'),
        { signal: abortSignal }
      ).then(res => res.json() as Promise<Passenger>)
    });
  }

  save(passenger: Passenger): Observable<Passenger> {
    const url = [this.baseUrl, 'passenger', passenger.id > 0 ? passenger.id : ''].join('/');

    return passenger.id > 0 ?
      this.http.put<Passenger>(url, passenger) :
      this.http.post<Passenger>(url, passenger);
  }
}
