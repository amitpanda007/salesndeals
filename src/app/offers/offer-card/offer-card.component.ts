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

  constructor(private dialog: MatDialog, private offerService: OfferService) {}

  ngOnInit(): void {}

  cardSelect() {
    const dialogRef = this.dialog.open(OfferPopUpDialogComponent, {
      width: '450px',
      data: {
        contact: this.offer,
      },
    });
  }
}
