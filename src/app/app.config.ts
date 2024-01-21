import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers, {
      metaReducers,
    }),
  ],
};
