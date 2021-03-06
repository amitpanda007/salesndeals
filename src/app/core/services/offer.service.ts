import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
  query,
  addDoc,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { where } from '@firebase/firestore';
import { Subject } from 'rxjs';
import { Offer } from 'src/app/models/offer';

@Injectable()
export class OfferService {
  private allOffers!: Offer[];
  // private offerColRef!: CollectionReference;
  public offersChanged = new Subject<Offer[]>();

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage
  ) {}

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

    if (querySnapshot.docs && querySnapshot.docs.length > 0) {
      const offers: any = [];
      querySnapshot.docs.forEach((doc) => {
        offers.push(doc.data() as Offer);
      });
      this.allOffers = offers;
      this.offersChanged.next(this.allOffers);
    } else {
      this.offersChanged.next();
    }
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
