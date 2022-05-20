import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferPopUpDialogComponent } from './offer-popup/offer-popup-dialog.component';
import { LocationRequestDialogComponent } from './location-request/location-request-dialog.component';
import { LocationSearchDialogComponent } from './location-search/location-search-dialog.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferCardComponent } from './offer-card/offer-card.component';

const routes: Routes = [
  {
    path: '',
    component: OfferListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {
  static components = [
    OfferListComponent,
    OfferCardComponent,
    LocationSearchDialogComponent,
    LocationRequestDialogComponent,
    OfferPopUpDialogComponent,
  ];
}
