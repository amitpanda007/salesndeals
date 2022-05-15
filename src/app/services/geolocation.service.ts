import { Injectable } from '@angular/core';
import { PlaceLocation } from '../models/placelocation';

@Injectable()
export class GeolocationService {
  constructor() {}

  requestLocation(callback: any) {
    // WC3 Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        callback(position.coords);
      },
      (error) => {
        callback(null);
      }
    );
  }

  getMapLink(location: PlaceLocation) {
    let query = '';
    if (location.latitude) {
      query = location.latitude + ',' + location.longitude;
    } else {
      query = `${location.latitude}, ${location.longitude}`;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }
    //Universal link
    //<a href="https://maps.google.com/?q=Eiffel+Tower">
    //<a href="https://maps.apple.com/?q=34.44,56.44">
  }
}
