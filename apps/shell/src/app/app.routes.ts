import { Routes } from '@angular/router';
import { HomeComponent } from '@flight-demo/shared/core';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('@flight-demo/domain/booking')
  },
  {
    path: 'checkin',
    loadChildren: () => import('@flight-demo/domain/checkin')
  },
  {
    path: 'boarding',
    loadChildren: () => import('@flight-demo/domain/boarding')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
