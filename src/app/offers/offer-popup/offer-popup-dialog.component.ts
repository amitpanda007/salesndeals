import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-offer-popup-dialog',
  templateUrl: './offer-popup-dialog.component.html',
  styleUrls: ['./offer-popup-dialog.component.scss'],
})
export class OfferPopUpDialogComponent implements OnInit {
  offerStartDate!: string;
  offerEndDate!: string;

  constructor(
    public dialogRef: MatDialogRef<OfferPopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OfferPopUpDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.offer?.startDate.seconds) {
      this.offerStartDate = new Date(
        this.data.offer?.startDate.seconds * 1000
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      this.offerEndDate = new Date(
        this.data.offer?.endDate.seconds * 1000
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      this.offerStartDate = new Date(
        this.data.offer?.startDate
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      this.offerEndDate = new Date(this.data.offer?.endDate).toLocaleDateString(
        'en-US',
        { month: 'long', day: 'numeric' }
      );
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface OfferPopUpDialogData {
  offer: Offer;
}

export interface OfferPopUpDialogResult {}
