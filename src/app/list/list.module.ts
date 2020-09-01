import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateListComponent } from './create-list/create-list.component';


@NgModule({
  declarations: [DashboardComponent, CreateListComponent],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
