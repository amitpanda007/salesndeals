import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { offer } from 'src/app/models/offer';
import { NewLocation } from 'src/app/models/new-location';
import { ContactService } from 'src/app/services/offer.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LocationService } from 'src/app/services/location.service';
import { ContactInfo } from '../contact-report/contact-report-dialog.component';
import {
  LocationRequestDialogComponent,
  LocationRequestDialogResult,
} from '../location-request/location-request-dialog.component';
import { LocationSearchDialogComponent } from '../location-search/location-search-dialog.component';

@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @ViewChild('contentCardOneRef') contentCardOneRef!: ElementRef;
  public contactSearch!: string;

  public isLoading: boolean = false;
  public contactList!: Contact;
  public contactListFiltered!: Contact;
  public isLocationSet: boolean = false;
  public isExpandedOne: boolean = false;
  public isExpandedTwo: boolean = false;
  public isExpandedThree: boolean = false;
  public isLocationSearch: boolean = false;

  constructor(
    private contactService: ContactService,
    private locationService: LocationService,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const currentCity = this.checkCurrentCity();
    this.locationService.locationChanged.subscribe((location) => {
      if (location) {
        this.isLoading = true;
        this.contactService.getContactCollection(location);
      }
    });

    console.log(currentCity);
    if (currentCity) {
      this.contactService.getContactCollection(currentCity);
    }
    this.contactService.contactsChanged.subscribe((contacts) => {
      this.contactList = contacts;
      if (contacts && contacts.location) {
        this.contactListFiltered = JSON.parse(JSON.stringify(contacts));
      } else {
        this.contactListFiltered = contacts;
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

  collapseExpand(data: string) {
    if (data == 'one') {
      this.isExpandedOne = !this.isExpandedOne;
    } else if (data == 'two') {
      this.isExpandedTwo = !this.isExpandedTwo;
    } else if (data == 'three') {
      this.isExpandedThree = !this.isExpandedThree;
    }
  }

  contactInputChanged() {
    console.log(this.contactSearch);
    if (this.contactSearch) {
      this.contactListFiltered.contactInfos.centralNumbers =
        this.contactList.contactInfos.centralNumbers.filter(
          (numbers: ContactInfo) => {
            return (
              numbers.name
                .toLowerCase()
                .indexOf(this.contactSearch.toLowerCase()) > -1
            );
          }
        );

      this.contactListFiltered.contactInfos.majorHelplines =
        this.contactList.contactInfos.majorHelplines.filter(
          (numbers: ContactInfo) => {
            return (
              numbers.name
                .toLowerCase()
                .indexOf(this.contactSearch.toLowerCase()) > -1
            );
          }
        );

      this.contactListFiltered.contactInfos.userProvidedNumbers =
        this.contactList.contactInfos.userProvidedNumbers.filter(
          (numbers: ContactInfo) => {
            return (
              numbers.name
                .toLowerCase()
                .indexOf(this.contactSearch.toLowerCase()) > -1
            );
          }
        );

      console.log(this.contactListFiltered);
    } else {
      this.contactListFiltered = this.contactList;
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
