import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateListComponent } from './create-list/create-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    
    path: 'create',
    component: CreateListComponent,
  },
  {
    path:'dashboard',
    component: DashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
