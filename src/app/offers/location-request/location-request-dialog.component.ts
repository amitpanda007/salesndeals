import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location';
import { NewLocation } from 'src/app/models/new-location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-request-dialog',
  templateUrl: './location-request-dialog.component.html',
  styleUrls: ['./location-request-dialog.component.scss'],
})
export class LocationRequestDialogComponent {
  public cityName!: string;
  public stateName!: string;
  public countryName!: string;
  public pin!: string;

  constructor(
    public dialogRef: MatDialogRef<LocationRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationRequestDialogData
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  submitRequest() {
    const newCity: NewLocation = {
      cityName: this.cityName,
      stateName: this.stateName,
      countryName: this.countryName,
      pin: this.pin,
    };
    this.dialogRef.close({ newCity: newCity });
  }
}

export interface LocationRequestDialogData {}

export interface LocationRequestDialogResult {
  newCity: NewLocation;
}
