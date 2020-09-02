import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListModule } from '../list/list.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [HomeComponent, SignupComponent, SigninComponent],
  imports: [MatIconModule,CommonModule,MatToolbarModule,MatInputModule, UsersRoutingModule,MatButtonModule, SharedModule,MatFormFieldModule,MatCardModule,MatGridListModule,FlexLayoutModule,ListModule],
})
export class UsersModule {}
