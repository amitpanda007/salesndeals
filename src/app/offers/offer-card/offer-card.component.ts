import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'offer-card',
  templateUrl: 'offer-card.component.html',
  styleUrls: ['offer-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() contact: ContactInfo | null = null;
  public contactNameWithNumber: string = '';

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactNameWithNumber =
      this.contact?.name + ' ( ' + this.contact?.telephone + ' ) ';
  }

  call(contactInfo: ContactInfo) {
    const callLink = document.createElement('a');
    callLink.href = `tel:${contactInfo?.telephone}`;
    callLink.click();
  }

  report(contactInfo: ContactInfo) {
    console.log('Reporting current contact');
    const city = window.localStorage.getItem('city');

    const dialogRef = this.dialog.open(ContactReporttDialogComponent, {
      width: '450px',
      data: {
        contactInfo: contactInfo,
        city: city,
      },
    });

    dialogRef.afterClosed().subscribe((result: ContactReporttDialogResult) => {
      if (!result) {
        return;
      }

      if (result.problemText) {
        this.contactService.reportContact(
          result.contactDetail,
          result.problemText
        );
      }
    });
  }

  cardSelect() {
    const dialogRef = this.dialog.open(ContactPopUpDialogComponent, {
      width: '450px',
      data: {
        contact: this.contact,
      },
    });
  }
}
