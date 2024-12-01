import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule} from '@auth0/angular-jwt';
import {JwtInterceptor} from './services/AuthService/JwtInterceptor';
import {provideHttpClientTesting} from '@angular/common/http/testing';

registerLocaleData(fr);

const tokenGetter = () => {
  return localStorage.getItem('token');
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),

    provideHttpClient(withInterceptors([JwtInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,  // Appel à la fonction tokenGetter
          allowedDomains: ['localhost:8222'], // Ajoutez votre domaine backend
          disallowedRoutes: ['http://localhost:8222/auth/login'], // Excluez le point d'entrée de connexion
        },
      })
    ),



  ],
};
