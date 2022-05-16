import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-offer-popup-dialog',
  templateUrl: './offer-popup-dialog.component.html',
  styleUrls: ['./offer-popup-dialog.component.scss'],
})
export class OfferPopUpDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OfferPopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OfferPopUpDialogData
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface OfferPopUpDialogData {
  offer: Offer;
}

export interface OfferPopUpDialogResult {}
