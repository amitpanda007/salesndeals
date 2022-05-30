import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AuthService } from './services/auth.service';
import { EnsureModuleLoadedOnceGuard } from './services/ensure-module-loaded-once.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LocationService } from './services/location.service';
import { OfferService } from './services/offer.service';
import { GeolocationService } from './services/geolocation.service';
import { ValidatorService } from './services/validator.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    GeolocationService,
    OfferService,
    LocationService,
    ValidatorService,
    MatSnackBarModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
