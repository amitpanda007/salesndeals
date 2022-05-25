import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';
import { OfferPopUpDialogComponent } from '../offer-popup/offer-popup-dialog.component';

@Component({
  selector: 'offer-card',
  templateUrl: 'offer-card.component.html',
  styleUrls: ['offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer | null = null;
  @Input() options: any = {};
  offerStartDate!: string;
  offerEndDate!: string;
  cardImage!: string;
  @ViewChild('cardRef', { read: ElementRef, static: true })
  cardRef!: ElementRef; // gets #target1

  constructor(private dialog: MatDialog, private offerService: OfferService) {}

  ngOnInit(): void {
    if (this.offer?.startDate.seconds) {
      this.offerStartDate = new Date(
        this.offer?.startDate.seconds * 1000
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      this.offerEndDate = new Date(
        this.offer?.endDate.seconds * 1000
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      this.offerStartDate = new Date(this.offer?.startDate).toLocaleDateString(
        'en-US',
        { month: 'long', day: 'numeric' }
      );
      this.offerEndDate = new Date(this.offer?.endDate).toLocaleDateString(
        'en-US',
        { month: 'long', day: 'numeric' }
      );
    }

    if (this.offer && this.offer.backgroundImage) {
      this.cardImage = `url(${this.offer.backgroundImage})`;
    }

    this.options.isVerified = this.offer?.isVerified;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.offer) {
      let newOffer = changes.offer.currentValue;
      this.offerStartDate = new Date(
        newOffer.startDate
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      this.offerEndDate = new Date(
        newOffer.startDate
      ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

      this.cardImage = `url(${newOffer.backgroundImage})`;
    }
  }

  ngAfterViewInit() {}

  cardSelect() {
    const dialogRef = this.dialog.open(OfferPopUpDialogComponent, {
      width: '450px',
      data: {
        offer: this.offer,
      },
    });
  }
}
