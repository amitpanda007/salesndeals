import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  CollectionReference,
  where,
  query,
  getDocs,
  addDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Location } from '../models/location';
import { NewLocation } from '../models/new-location';

@Injectable()
export class LocationService {
  public locationChanged = new BehaviorSubject('');
  private filterLocation: Location[] = [];
  private locationCol!: CollectionReference;

  public locationDataChanged = new Subject<Location[]>();
  public countrySearchData = new Subject();
  public citySearchData = new Subject<Location[]>();

  constructor(private http: HttpClient, private firestore: Firestore) {}

  async getLocationCollection(partialCity: string) {
    this.filterLocation = [];
    this.locationCol = collection(this.firestore, 'locations');

    const searchTerm = this.capitalizeFirstLetter(partialCity);
    const q = query(
      this.locationCol,
      where('name', 'array-contains-any', [searchTerm])
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((locData) => {
      console.log(locData.id, ' => ', locData.data());
      this.filterLocation.push(locData.data() as Location);
    });
    this.locationDataChanged.next([...this.filterLocation]);
  }

  getCountryByName(partialCity: string) {
    const url = `http://localhost:5000/search/country?partialSearch=${partialCity}`;
    this.http.get(url).subscribe((resp) => {
      console.log(resp);
      this.countrySearchData.next(resp);
    });
  }

  getCityByName(partialCity: string) {
    const url = `http://localhost:5000/search/city?partialSearch=${partialCity}`;
    this.http.get(url).subscribe((resp) => {
      console.log(resp);
      this.citySearchData.next(resp as Location[]);
    });
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async requestToAddNewLocation(location: NewLocation) {
    await addDoc(collection(this.firestore, 'requests'), {
      cityName: location.cityName,
      stateName: location.stateName,
      pin: location.pin,
    });
  }
}
