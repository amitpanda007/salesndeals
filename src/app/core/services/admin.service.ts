import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  doc,
  getDocs,
  getDoc,
  query,
  addDoc,
  updateDoc,
  setDoc
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { where } from '@firebase/firestore';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import { arrayUnion } from 'firebase/firestore';

@Injectable()
export class AdminOfferService {
  private adminOffers!: Offer[];
  public adminOffersChanged = new Subject<Offer[]>();

  private offersCollection: AngularFirestoreCollection<Offer>;
  private allOffers!: Offer[];
  private offersSubscription: Subscription;
  public offersChanged = new BehaviorSubject<Offer[]>([]);

  private offerDocument: AngularFirestoreDocument<Offer>;
  private offerSubscription: Subscription;

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  async getAdminOfferCollection() {
    this.auth.authState.subscribe(async (userInfo) => {
      const userId = userInfo?.uid;
      const offerColRef = collection(this.firestore, 'offers');
      const q = query(
        offerColRef,
        where('owners', 'array-contains-any', [userId])
      );

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

  getAdminOfferCollectionWithId() {
    this.auth.authState.subscribe(async (userInfo) => {
      this.offersCollection = this.afs.collection<Offer>('offers', (ref) =>
        ref.where('owners', 'array-contains-any', [userInfo?.uid])
      );

      this.offersSubscription = this.offersCollection
        .valueChanges({ idField: 'id' })
        .subscribe((offers) => {
          this.allOffers = offers;
          this.offersChanged.next([...this.allOffers]);
        });
    });
  }

  async getOfferDocument(docId: string) {
    // const offerColRef = collection(this.firestore, 'offers');
    const docRef = doc(this.firestore, "offers", `${docId}`);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as Offer;
    }else {
      console.log("No such document!");
      return {};
    }
  }

  getUser(): Promise<any> {
    return this.auth.authState.pipe(first()).toPromise();
  }

  async addOffer(offer: Offer, file: any) {
    console.log(offer);

    this.auth.authState.subscribe(async (userInfo) => {
      if (file) {
        const fileName = file.name;
        const storageRef = this.storage.ref('banners');
        const fileRef = storageRef.child(fileName);
        const uploadTaskSnapshot = await fileRef.put(file);
        const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
        console.log(downloadURL);
        offer.backgroundImage = downloadURL;
      }
      offer.owners = [userInfo!.uid];
      const offerColRef = collection(this.firestore, 'offers');
      addDoc(offerColRef, offer);
    });
  }

  async updateOffer(docId: string, offer: Offer, file: any) {
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
    const offerDocRef = doc(this.firestore, 'offers', `${docId}`);
    await updateDoc(offerDocRef, {
      name: offer.name,
      description: offer.description,
      offerContent: offer.offerContent,
      city: offer.city,
      startDate: offer.startDate,
      endDate: offer.endDate,
    });
  }

  deleteOffer(offer: Offer) {
    this.auth.authState.subscribe(async (userInfo) => {
      if (offer.owners?.includes(userInfo!.uid)) {
        this.afs.collection('offers').doc(offer.id).delete();
      }
    });
  }
}
