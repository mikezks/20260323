
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
