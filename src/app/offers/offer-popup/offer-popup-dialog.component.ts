import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactInfo } from 'src/app/models/offer';

@Component({
  selector: 'app-contact-popup-dialog',
  templateUrl: './contact-popup-dialog.component.html',
  styleUrls: ['./contact-popup-dialog.component.scss'],
})
export class ContactPopUpDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactPopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactPopUpDialogData
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface ContactPopUpDialogData {
  contact: ContactInfo;
  timer: any;
}

export interface ContactPopUpDialogResult {}
