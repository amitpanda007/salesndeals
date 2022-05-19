import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { NewLocation } from 'src/app/models/new-location';
import { OfferService } from 'src/app/services/offer.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LocationService } from 'src/app/services/location.service';
import {
  LocationRequestDialogComponent,
  LocationRequestDialogResult,
} from '../location-request/location-request-dialog.component';
import { LocationSearchDialogComponent } from '../location-search/location-search-dialog.component';

@Component({
  selector: 'offer-list',
  templateUrl: 'offer-list.component.html',
  styleUrls: ['offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  public offerSearch!: string;

  public isLoading: boolean = false;
  public offerList!: Offer[];
  public offerListFiltered!: Offer[]
  public isLocationSet: boolean = false;
  public isLocationSearch: boolean = false;

  constructor(
    private offerService: OfferService,
    private locationService: LocationService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const currentCity = this.checkCurrentCity();
    this.locationService.locationChanged.subscribe((location) => {
      if (location) {
        this.isLoading = true;
        this.offerService.getOfferCollection(location);
      }
    });

    console.log(currentCity);
    if (currentCity) {
      this.offerService.getOfferCollection(currentCity);
    }
    this.offerService.offersChanged.subscribe((offers) => {
      console.log(offers);
      this.offerList = offers;
      if (offers) {
        this.offerListFiltered = JSON.parse(JSON.stringify(offers));
      } else {
        this.offerListFiltered = offers;
      }
      // console.log(JSON.stringify(this.contactList));
      this.isLoading = false;
      this.checkCurrentCity();
    });
  }

  checkCurrentCity(): string {
    const currentCity: string = window.localStorage.getItem('city') as string;
    if (currentCity != null) {
      this.isLocationSet = true;
    } else {
      this.isLoading = false;
      this.isLocationSet = false;
    }
    return currentCity;
  }

  requestNewCity() {
    let dislogRef = this.dialog.open(LocationRequestDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dislogRef.afterClosed().subscribe((result: LocationRequestDialogResult) => {
      if (!result) {
        return;
      }
      const newCity: NewLocation = result.newCity;
      this.locationService.requestToAddNewLocation(newCity);
    });
  }

  offerInputChanged() {
    console.log(this.offerSearch);
    if (this.offerSearch) {
      this.offerListFiltered =
        this.offerList.filter(
          (offer: Offer) => {
            return (
              offer.name
                .toLowerCase()
                .indexOf(this.offerSearch.toLowerCase()) > -1
            );
          }
        );
    } else {
      this.offerListFiltered = this.offerList;
    }
  }

  setLocation() {
    console.log('Set Location');
    this.isLocationSearch = !this.isLocationSearch;
    const dialogRef = this.dialog.open(LocationSearchDialogComponent, {
      width: '80%',
      height: '60%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == undefined) {
        return;
      }
      if (result.selectedCity) {
        this.locationService.locationChanged.next(result.selectedCity);
        window.localStorage.setItem('city', result.selectedCity);
      }
    });
  }
}
