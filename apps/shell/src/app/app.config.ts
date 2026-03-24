import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideCheckNoChangesConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideRouterFeature } from '@flight-demo/shared/state';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideCheckNoChangesConfig({
      exhaustive: true,
      interval: 3_000
    })
  ]
};
