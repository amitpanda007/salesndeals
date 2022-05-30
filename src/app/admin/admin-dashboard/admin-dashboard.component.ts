import { Component, OnInit } from '@angular/core';
import { AdminOfferService } from 'src/app/core/services/admin.service';
import { CardOptions, Offer } from 'src/app/models/offer';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  
  public adminOfferList!: Offer[];
  public cardOptions: CardOptions;

  constructor(private adminOfferService: AdminOfferService) {}

  ngOnInit(): void {
    this.adminOfferService.getAdminOfferCollection();
    this.adminOfferService.adminOffersChanged.subscribe(offers => {
      console.log(offers);
      this.adminOfferList = offers;
      this.cardOptions = {
        isDelete: true,
        isEdit: true
      }
    })
  }
}
