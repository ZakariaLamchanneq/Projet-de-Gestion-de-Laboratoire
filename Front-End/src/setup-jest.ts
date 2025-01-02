import {TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone';
import {provideHttpClient} from '@angular/common/http';

setupZoneTestEnv();


TestBed.configureTestingModule({
  imports: [
    BrowserAnimationsModule, // Fix animations issues
  ],
  providers: [
    provideHttpClient(), // Provide HttpClient globally
    {provide: NzModalRef, useValue: {}}, // Provide mock NzModalRef
  ],
});
