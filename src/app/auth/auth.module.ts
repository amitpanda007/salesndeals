import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [AuthRoutingModule.components],
  exports: [],
})
export class MyAuthModule {}
