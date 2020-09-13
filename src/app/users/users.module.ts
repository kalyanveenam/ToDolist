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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { from } from 'rxjs';
@NgModule({
  declarations: [HomeComponent, SignupComponent, SigninComponent],
  imports: [MatSnackBarModule,NgxSpinnerModule,FormsModule,MatIconModule,CommonModule,MatToolbarModule, ReactiveFormsModule,MatInputModule, UsersRoutingModule,MatButtonModule, SharedModule,MatFormFieldModule,MatCardModule,MatGridListModule,FlexLayoutModule,ListModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule {}
