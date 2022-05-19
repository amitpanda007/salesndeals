import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';
import { OfferPopUpDialogComponent } from '../offer-popup/offer-popup-dialog.component';

@Component({
  selector: 'offer-card',
  templateUrl: 'offer-card.component.html',
  styleUrls: ['offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer | null = null;
  offerStartDate! : string; 

  constructor(private dialog: MatDialog, private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerStartDate = new Date(this.offer?.startDate.seconds*1000).toLocaleDateString("en-US", { month: "long", day: "numeric" });
  }

  ngAfterViewInit() {
    // style="background-image: url('assets/images/big_bazaar.png');background-size: cover;"
    (document.querySelector('.card') as HTMLElement).style.backgroundImage = "url('assets/images/big_bazaar.png')";
}

  cardSelect() {
    const dialogRef = this.dialog.open(OfferPopUpDialogComponent, {
      width: '450px',
      data: {
        offer: this.offer,
      },
    });
  }
}
