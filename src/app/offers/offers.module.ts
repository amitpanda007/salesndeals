import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OffersRoutingModule } from './offers.routing.module';

@NgModule({
  imports: [SharedModule, OffersRoutingModule],
  declarations: [OffersRoutingModule.components],
  exports: [OfferListComponent, OfferCardComponent],
})
export class OffersModule {}
