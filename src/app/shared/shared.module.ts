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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  declarations: [NavbarComponent, LogoutComponent, CorouselComponent],
  imports: [CommonModule, SharedRoutingModule,MatToolbarModule,MatButtonModule,MatIconModule,MatDividerModule, SlickCarouselModule,MatExpansionModule,MatMenuModule],
  providers: [HttpService],
  exports: [NavbarComponent,CorouselComponent],
})
export class SharedModule {}
