import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Offer } from 'src/app/models/offer';
import { AdminOfferService } from 'src/app/core/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-offer',
  templateUrl: 'edit-offer.component.html',
  styleUrls: ['edit-offer.component.scss'],
})
export class EditOfferComponent implements OnInit {
  fileToUpload: any;
  offerForm!: FormGroup;

  nameControl!: FormControl;
  descControl!: FormControl;
  offerContentControl!: FormControl;
  cityControl!: FormControl;
  startDateControl!: FormControl;
  endDateControl!: FormControl;
  // bgImageControl!: FormControl;

  private offerData!: Offer;
  offer!: Offer;
  offerCardOptions!: any;
  offerBgImage!: any;

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

  constructor(private route: ActivatedRoute, private adminOfferService: AdminOfferService) {}

  async ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.offerData = await this.adminOfferService.getOfferDocument(docId!) as Offer;

    this.offer = {
      name: this.offerData.name,
      description: this.offerData.description,
      offerContent: this.offerData.offerContent,
      city: [...this.offerData.city],
      startDate: this.offerData.startDate,
      endDate: this.offerData.endDate
    };

    if(this.offerData.backgroundImage) {
      this.offer.backgroundImage = this.offerData.backgroundImage;
    }

    this.offerCardOptions = {
      isPreview: true,
      isVerified: false,
    };

    this.nameControl = new FormControl(this.offerData.name, Validators.required);
    this.descControl = new FormControl(this.offerData.description);
    this.offerContentControl = new FormControl(this.offerData.offerContent);
    this.cityControl = new FormControl(this.offerData.city, Validators.required);
    this.startDateControl = new FormControl(this.offerData.startDate.toDate(), Validators.required);
    this.endDateControl = new FormControl(this.offerData.endDate.toDate(), Validators.required);
    // this.bgImageControl = new FormControl('');

    this.offerForm = new FormGroup({
      name: this.nameControl,
      description: this.descControl,
      offerContent: this.offerContentControl,
      city: this.cityControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      // backgroundImage: this.bgImageControl,
    });

    this.offerForm.valueChanges.subscribe((value: any) => {
      // console.log(value);
      this.offer = value;
      this.offer.city = [value.city];
    });
  }

  updateOffer() {
    if (this.offerForm.valid) {
      console.log('Form is Valid');
    } else {
      console.log('Form is InValid');
    }
    // console.log(this.offerForm.value);
    const editedOffer: Offer = {
      name: this.offerForm.value.name,
      description: this.offerForm.value.description,
      offerContent: this.offerForm.value.offerContent,
      city: this.offerForm.value.city,
      startDate: this.offerForm.value.startDate,
      endDate: this.offerForm.value.endDate,
    };

    console.log(editedOffer);
    console.log(this.fileToUpload);
    const docId = this.route.snapshot.paramMap.get('id') as string;
    this.adminOfferService.updateOffer(docId, editedOffer, this.fileToUpload);
  }
}
