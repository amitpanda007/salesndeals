import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'add', component: AddOfferComponent },
  { path: 'edit/:id', component: EditOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [AddOfferComponent, AdminDashboardComponent, EditOfferComponent];
}
