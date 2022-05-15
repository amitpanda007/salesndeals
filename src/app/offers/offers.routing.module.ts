import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactPopUpDialogComponent } from './contact-popup/contact-popup-dialog.component';
import { ContactReporttDialogComponent } from './contact-report/contact-report-dialog.component';
import { LocationRequestDialogComponent } from './location-request/location-request-dialog.component';
import { LocationSearchDialogComponent } from './location-search/location-search-dialog.component';

const routes: Routes = [
  {
    path: 'offers',
    component: ContactListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {
  static components = [
    ContactListComponent,
    ContactCardComponent,
    LocationSearchDialogComponent,
    LocationRequestDialogComponent,
    ContactReporttDialogComponent,
    ContactPopUpDialogComponent,
  ];
}
