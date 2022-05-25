import { NgModule } from '@angular/core';
import { OffersModule } from '../offers/offers.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule, OffersModule],
  declarations: [AdminRoutingModule.components],
  exports: [],
})
export class AdminModule {}
