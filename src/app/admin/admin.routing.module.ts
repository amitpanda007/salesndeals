import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'add', component: AddOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [AddOfferComponent, AdminDashboardComponent];
}
