import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/core/services/offer.service';
import { OfferPopUpDialogComponent } from '../offer-popup/offer-popup-dialog.component';

@Component({
  selector: 'offer-card',
  templateUrl: 'offer-card.component.html',
  styleUrls: ['offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;
  @Input() options: any = {};
  @Input() bgImage: any;
  @Output() delete: EventEmitter<Offer> = new EventEmitter();
  @Output() edit: EventEmitter<Offer> = new EventEmitter();

  offerStartDate!: string;
  offerEndDate!: string;
  cardImage: string = '';
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
      this.cardImage = this.offer.backgroundImage;
    }

    this.options.isVerified = this.offer?.isVerified ? this.offer?.isVerified : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.offer) {
      let newOffer = changes.offer.currentValue;
      console.log(newOffer);
      if (newOffer.startDate && newOffer.startDate.seconds) {
        this.offerStartDate = new Date(
          this.offer?.startDate.seconds * 1000
        ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        this.offerEndDate = new Date(
          this.offer?.endDate.seconds * 1000
        ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      } else {
        this.offerStartDate = new Date(newOffer.startDate).toLocaleDateString(
          'en-US',
          { month: 'long', day: 'numeric' }
        );
        this.offerEndDate = new Date(newOffer.endDate).toLocaleDateString(
          'en-US',
          { month: 'long', day: 'numeric' }
        );
      }
    }

    if (changes.bgImage) {
      if (changes.bgImage.currentValue !== undefined) {
        this.cardImage = changes.bgImage.currentValue;
        // console.log(this.cardImage);
      }
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

  editOffer() {
    console.log("Edit Offer");
    this.edit.emit(this.offer);
  }

  deleteOffer() {
    console.log("Delete Offer");
    this.delete.emit(this.offer);
  }
}
