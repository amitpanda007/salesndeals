import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from './models/location';
import { LocationService } from './services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationSearchDialogComponent } from './offers/location-search/location-search-dialog.component';
import { OfferService } from './services/offer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'salesndeals';
  public isSearching: boolean = false;
  public locationList: Location[] = [];
  public currentLocation!: string;
  public isOffline: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private locationService: LocationService,
    private offerService: OfferService
  ) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        console.log('Location accessed');
        console.log(pos);
      },
      function () {
        console.log('User not allowed');
      },
      { timeout: 10000 }
    );

    if (navigator.onLine) {
      this.isOffline = false;
    } else {
      this.isOffline = true;
    }

    window.addEventListener('offline', () => {
      this.isOffline = true;
      this._snackBar.open('You are offline', 'Cancel', {
        duration: 2000,
      });
    });

    window.addEventListener('online', () => {
      this.isOffline = false;
      this._snackBar.open('Back online', 'Cancel', {
        duration: 2000,
      });
    });

    if ((navigator as any).standalone == false) {
      // This is an iOS device  and we are in browser
      this._snackBar.open('You cna add this PWA to the Home Screen', '', {
        duration: 3000,
      });
    }

    if ((navigator as any).standalone == undefined) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this._snackBar.open(
            'Do you want to install this App?',
            'install',
            { duration: 5000 }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              if (result.outcome == 'dismissed') {
                //TODO: Track on installation
              } else {
                //TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }

    this.locationService.locationChanged.subscribe((cityChanged) => {
      const city = window.localStorage.getItem('city');
      if (cityChanged != '') {
        this.currentLocation = cityChanged;
      } else if (city) {
        this.currentLocation = city;
      } else {
        this.currentLocation = 'Set Location';
      }
    });
  }

  ngOnDestroy() {
    this.locationService.locationChanged.unsubscribe();
  }

  chnageLocation() {
    console.log('Set Location');
    this.isSearching = !this.isSearching;
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

  removeLocation() {
    console.log('Removing Current Location');
    window.localStorage.removeItem('city');
    this.locationService.locationChanged.next('');
    this.offerService.offersChanged.next(undefined);
  }

  reloadPage() {
    window.location.reload();
  }
}