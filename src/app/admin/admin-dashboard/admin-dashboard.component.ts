import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  DeleteConfirmationDialogComponent,
  DeleteConfirmationDialogResult,
} from 'src/app/common/delete.dialog.component';
import { AdminOfferService } from 'src/app/core/services/admin.service';
import { CardOptions, Offer } from 'src/app/models/offer';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public adminOfferList!: Offer[];
  public cardOptions: CardOptions;

  constructor(
    private router: Router,
    private adminOfferService: AdminOfferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.adminOfferService.getAdminOfferCollectionWithId();
    this.adminOfferService.offersChanged.subscribe((offers) => {
      console.log(offers);
      this.adminOfferList = offers;
      this.cardOptions = {
        isDelete: true,
        isEdit: true,
      };
    });
  }

  deleteOffer(offer: Offer) {
    console.log(offer);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DeleteConfirmationDialogResult) => {
        if (!result) {
          return;
        }

        if (result.delete) {
          this.adminOfferService.deleteOffer(offer);
        }
      });
  }

  editOffer(offer: Offer) {
    console.log(offer);
    this.router.navigate(['/admin/edit', offer.id]);
  }
}
