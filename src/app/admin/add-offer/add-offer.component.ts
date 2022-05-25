import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/app/models/offer';

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
  bgImageControl!: FormControl;

  offer!: Offer;
  offerCardOptions!: any;

  fileChanged(event: any) {
    console.log(event);
    this.fileToUpload = event.target.files[0];
  }

  constructor() {}

  ngOnInit(): void {
    this.offer = {
      name: "New Offer",
      description: "sample description",
      offerContent: "sample offer content",
      city: "New York",
      startDate: new Date(),
      endDate: new Date()
    }

    this.offerCardOptions = {
      isPreview: true,
      isVerified: false
    }

    this.nameControl = new FormControl('', Validators.required);
    this.descControl = new FormControl('');
    this.offerContentControl = new FormControl('');
    this.cityControl = new FormControl('', Validators.required);
    this.startDateControl = new FormControl('', Validators.required);
    this.endDateControl = new FormControl('', Validators.required);
    this.bgImageControl = new FormControl('');

    this.offerForm = new FormGroup({
      name: this.nameControl,
      description: this.descControl,
      offerContent: this.offerContentControl,
      city: this.cityControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      backgroundImage: this.bgImageControl,
    });

    this.offerForm.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.offer = value;
    })
  }

  addOffer() {
    if(this.offerForm.valid) {
      console.log("Form is Valid");
    }else {
      console.log("Form is InValid");
    }
    console.log(this.offerForm.value);
  }
}
