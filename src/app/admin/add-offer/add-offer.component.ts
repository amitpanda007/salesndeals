import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Offer } from 'src/app/models/offer';
import { AdminOfferService } from 'src/app/core/services/admin.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'add-offer',
  templateUrl: 'add-offer.component.html',
  styleUrls: ['add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  fileToUpload: any;
  offerForm!: FormGroup;

  nameControl!: FormControl;
  descControl!: FormControl;
  offerContentControl!: FormControl;
  cityControl!: FormControl;
  startDateControl!: FormControl;
  endDateControl!: FormControl;
  // bgImageControl!: FormControl;

  offer!: Offer;
  offerCardOptions!: any;
  offerBgImage!: any;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  cities: string[] = [];

  fileChanged(event: any) {
    console.log(event.target.files);
    this.fileToUpload = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      // console.log(reader.result);
      this.offerBgImage = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  constructor(private adminOfferService: AdminOfferService) {}

  ngOnInit(): void {
    this.offer = {
      name: 'New Offer',
      description: 'sample description',
      offerContent: 'sample offer content',
      city: ['New York'],
      startDate: new Date(),
      endDate: new Date(),
    };

    this.offerCardOptions = {
      isPreview: true,
      isVerified: false,
    };

    this.nameControl = new FormControl('', Validators.required);
    this.descControl = new FormControl('');
    this.offerContentControl = new FormControl('');
    // this.cityControl = new FormControl('', Validators.required);
    this.startDateControl = new FormControl('', Validators.required);
    this.endDateControl = new FormControl('', Validators.required);
    // this.bgImageControl = new FormControl('');

    this.offerForm = new FormGroup({
      name: this.nameControl,
      description: this.descControl,
      offerContent: this.offerContentControl,
      // city: this.cityControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      // backgroundImage: this.bgImageControl,
    });

    this.offerForm.valueChanges.subscribe((value: any) => {
      this.offer = value;
    });
  }

  addOffer() {
    if (this.offerForm.valid) {
      console.log('Form is Valid');
    } else {
      console.log('Form is InValid');
    }
    
    const newOffer: Offer = {
      name: this.offerForm.value.name,
      description: this.offerForm.value.description,
      offerContent: this.offerForm.value.offerContent,
      // city: [this.offerForm.value.city],
      city: this.cities,
      startDate: this.offerForm.value.startDate,
      endDate: this.offerForm.value.endDate,
    };

    console.log(newOffer);
    console.log(this.fileToUpload);
    this.adminOfferService.addOffer(newOffer, this.fileToUpload);
  }

  addCity(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.cities.push(value);
    }
    event.chipInput!.clear();
  }

  removeCity(city: string): void {
    const index = this.cities.indexOf(city);
    if (index >= 0) {
      this.cities.splice(index, 1);
    }
  }
}
