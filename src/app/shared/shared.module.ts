import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {MatBadgeModule} from '@angular/material/badge';

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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, LogoutComponent, CorouselComponent, DialogComponent, FooterComponent],
  imports: [MatDialogModule,MatBadgeModule,FormsModule,ReactiveFormsModule,CommonModule, SharedRoutingModule,MatToolbarModule,MatButtonModule,MatIconModule,MatDividerModule, SlickCarouselModule,MatExpansionModule,MatMenuModule],
  providers: [HttpService],
 entryComponents:[DialogComponent],
  exports: [NavbarComponent,CorouselComponent, FooterComponent],
})
export class SharedModule {}
