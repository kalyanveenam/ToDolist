import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpService} from '../http.service'
import { from } from 'rxjs';
import { MatToolbarModule, } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {CorouselComponent } from './corousel/corousel.component';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [NavbarComponent, LogoutComponent, CorouselComponent],
  imports: [CommonModule, SharedRoutingModule,MatToolbarModule,MatButtonModule,MatIconModule,SlickCarouselModule],
  providers: [HttpService],
  exports: [NavbarComponent,CorouselComponent],
})
export class SharedModule {}
