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
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';

@Injectable()
export class AdminOfferService {
  private adminOffers!: Offer[];
  public adminOffersChanged = new Subject<Offer[]>();

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth
  ) {}

  async getAdminOfferCollection() {
    this.auth.authState.subscribe(async (userInfo) => {
      const userId = userInfo?.uid;
      const offerColRef = collection(this.firestore, 'offers');
      const q = query(offerColRef, where('owners', 'array-contains-any', [userId]));

      console.log('This should come after');
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs && querySnapshot.docs.length > 0) {
        const offers: any = [];
        querySnapshot.docs.forEach((doc) => {
          offers.push(doc.data() as Offer);
        });
        this.adminOffers = offers;
        this.adminOffersChanged.next(this.adminOffers);
      } else {
        this.adminOffersChanged.next();
      }
    });
  }

  getUser(): Promise<any> {
    return this.auth.authState.pipe(first()).toPromise();
  }

  async addOffer(offer: Offer, file: any) {
    console.log(offer);

    if (file) {
      const fileName = file.name;
      const storageRef = this.storage.ref('banners');
      const fileRef = storageRef.child(fileName);
      const uploadTaskSnapshot = await fileRef.put(file);
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      console.log(downloadURL);
      offer.backgroundImage = downloadURL;
    }
    offer.owners = [];
    const offerColRef = collection(this.firestore, 'offers');
    addDoc(offerColRef, offer);
  }
}
