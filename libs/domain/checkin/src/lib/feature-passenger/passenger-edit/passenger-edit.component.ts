import { httpResource } from '@angular/common/http';
import { Component, input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, schema, SchemaPath, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';

export function validateLastname(
  field: SchemaPath<string>,
  allowedLastnames: string[],
  message: string
) {
  validate(field, ({ value }) =>
    allowedLastnames.includes(value())
      ? null
      : {
        kind: 'forbiddenLastname',
        message: message + ' The following Lastnames are allowed: '
          + allowedLastnames.join(', ')
      }
  );
}

// (3) Field Logic: Validators, Metadata, Conditional Disabled
export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.firstName, {
    message: 'The Firstname is mandatory. Please enter a value.'
  });
  validateLastname(
    passengerPath.name,
    ['Muster', 'Sorglos', 'Müller'],
    'The entered Lastname is not allowed.'
  );
});


@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) UI Control: Template Binding
    FormField
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // (1) Data Model: Writable Signal
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  // (2) Field State: value, valid, dirty, touched, ...
  protected readonly editForm = form(this.passengerResource.value, passengerSchema);

  readonly id = input(0, { transform: numberAttribute });
  
  protected save(): void {
    console.log(this.editForm().value());
  }
}
