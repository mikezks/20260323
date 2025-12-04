import { Component, effect, linkedSignal, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { COUNTRIES_WITH_REGIONS } from "./countries-regions";


@Component({
  selector: 'app-airport',
  imports: [
    FormsModule
  ],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Airports</h2>
      </div>

      <div class="card-body">

        <form>
          <div class="form-group">
            <label for="country">Country:</label>
            <select [(ngModel)]="country" id="country" name="country" class="form-control">
              @for (value of countries(); track $index) {
                <option [value]="value">{{ value }}</option>  
              }
            </select>
          </div>
          <div class="form-group">
            <label for="region">Region:</label>
            <select [(ngModel)]="region" id="region" name="region" class="form-control">
              @for (value of regions(); track $index) {
                <option [value]="value">{{ value }}</option>  
              }
            </select>
          </div>
        </form>

      </div>
    </div>
  `
})
export class Airport {
  protected countries = signal(
    Object.keys(COUNTRIES_WITH_REGIONS)
  );
  // Simple signature
  protected country = linkedSignal(
    () => this.countries()[0]
  );
  protected regions = linkedSignal(
    () => COUNTRIES_WITH_REGIONS[this.country()]
  );
  // Extended signature
  protected region = linkedSignal<string[], string>({
    source: this.regions,
    computation: (source, previous) => {
      console.log(previous);
      return source[0];
    }
  });

  constructor() {
    effect(() => console.log({
      country: this.country(),
      region: this.region()
    }));
  }
}