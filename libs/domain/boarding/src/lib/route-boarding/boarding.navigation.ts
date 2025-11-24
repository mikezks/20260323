import { NavigationConfig } from '@flight-demo/shared/navigation';


export const BOARDING_NAVIGATION: NavigationConfig = [
  {
    route: 'boarding',
    label: 'Boarding',
    icon: 'boarding',
    items: [
      {
        route: 'ticket',
        label: 'Tickets',
        icon: 'mobile'
      },
      {
        route: 'departures',
        label: 'Departures',
        icon: 'departures'
      },
      {
        route: 'scan-ticket',
        label: 'Scan Ticket',
        icon: 'mobile'
      }
    ]
  }
];
