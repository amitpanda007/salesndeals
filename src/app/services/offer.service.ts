import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
  query,
  addDoc,
} from '@angular/fire/firestore';
import { where } from '@firebase/firestore';
import { Subject } from 'rxjs';
import { Offer } from '../models/offer';

@Injectable()
export class OfferService {
  private allOffers!: Offer[];
  // private offerColRef!: CollectionReference;
  public offersChanged = new Subject<Offer[]>();

  constructor(private firestore: Firestore) {}

  async getOfferCollection(city: string) {
    console.log(location);
    const _city = [
      this.capitalizeFirstLetter(city),
      city.toUpperCase(),
      city.toLowerCase(),
    ];
    const offerColRef = collection(this.firestore, 'offers');
    const q = query(
      offerColRef,
      where('city', 'array-contains-any', [..._city])
    );

    const querySnapshot = await getDocs(q);
    const firstDocument = querySnapshot.docs[0];

    if (firstDocument) {
      this.allOffers = firstDocument.data() as Offer[];
      this.offersChanged.next(this.allOffers);
    } else {
      this.offersChanged.next();
    }
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
