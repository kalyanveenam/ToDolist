import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpService} from '../http.service'
import { from } from 'rxjs';
@NgModule({
  declarations: [NavbarComponent, LogoutComponent],
  imports: [CommonModule, SharedRoutingModule],
  providers: [HttpService],
  exports: [NavbarComponent],
})
export class SharedModule {}
