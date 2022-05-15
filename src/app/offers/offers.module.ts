import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsRoutingModule } from './contacts.routing.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ContactsRoutingModule.components],
  exports: [ContactListComponent, ContactCardComponent],
})
export class ContactsModule {}
