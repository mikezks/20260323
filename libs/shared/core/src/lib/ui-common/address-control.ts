import { Component, input } from '@angular/core';
import { FieldTree, FormField, required, schema } from '@angular/forms/signals';


export interface Address {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}

export const initialAddress: Address = {
  street: '',
  number: '',
  zipCode: '',
  city: '',
  country: ''
};

export const addressSchema = schema<Address>(addressPath => {
  required(addressPath.street, {
    message: 'Please enter a street name.'
  });
});


@Component({
  selector: 'app-adress-form',
  imports: [FormField],
  template: `
    @let addressForm = this.address();

    <h6>Address</h6>

    <div class="form-group">
      <label for="street">Street:</label>
      <input id="street" [formField]="addressForm.street" type="string" class="form-control" />
    </div>
    @for (error of addressForm.street().errors(); track error.kind) {
      <div class="alert alert-danger">
        {{ error.message }}
      </div>
    }

    <div class="form-group">
      <label for="number">Number:</label>
      <input id="number" [formField]="addressForm.number" type="string" class="form-control" />
    </div>

    <div class="form-group">
      <label for="zipCode">ZIP code:</label>
      <input id="zipCode" [formField]="addressForm.zipCode" type="string" class="form-control" />
    </div>

    <div class="form-group">
      <label for="city">City:</label>
      <input id="city" [formField]="addressForm.city" type="string" class="form-control" />
    </div>

    <div class="form-group">
      <label for="country">Country:</label>
      <input id="country" [formField]="addressForm.country" type="string" class="form-control" />
    </div>
  `,
  styles: `
    h6 {
      margin-top: 40px;
      margin-bottom: 16px;
    }
  `
})
export class AddressForm {
  address = input.required<FieldTree<Address>>();
}