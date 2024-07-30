import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './state/item.reducers';
import { provideEffects } from '@ngrx/effects';
import { ItemEffects } from './state/item.effects';
import { ItemService } from './services/item.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ item: itemReducer }),
    provideEffects(ItemEffects),
    ItemService
  ],
};
