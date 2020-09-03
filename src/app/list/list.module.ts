import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateListComponent } from './create-list/create-list.component';
import { MatGridListModule } from '@angular/material/grid-list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [DashboardComponent, CreateListComponent],
  imports: [
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    ListRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule
  ],
})
export class ListModule {}
