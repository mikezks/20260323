
export interface Passenger {
    id: number;
    firstName: string,
    name: string;
    bonusMiles: number;
    passengerStatus: string;
}

export const initialPassenger: Passenger = {
  id: 0,
  firstName: '',
  name: '',
  bonusMiles: 0,
  passengerStatus: ''
};

export interface PassengerFilter {
  firstname: string;
  lastname: string;
}

export const initialPassengerFilter: PassengerFilter = {
  firstname: '',
  lastname: ''
};
