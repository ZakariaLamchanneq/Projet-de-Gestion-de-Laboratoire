import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import {provideHttpClient, withFetch} from '@angular/common/http';

TestBed.configureTestingModule({
  providers: [
    provideHttpClient(withFetch()) // Globally provide HttpClient
  ],
});
