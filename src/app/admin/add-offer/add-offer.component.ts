import { Component } from '@angular/core';

@Component({
  selector: 'add-offer',
  templateUrl: 'add-offer.component.html',
  styleUrls: ['add-offer.component.scss'],
})
export class AddOfferComponent {
  fileToUpload: any;

  fileChanged(event: any) {
    console.log(event);
    this.fileToUpload = event.target.files[0];
  }
}
