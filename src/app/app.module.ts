import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UsersModule } from './users/users.module';
@NgModule({
  declarations: [AppComponent],
  imports: [UsersModule,BrowserModule, AppRoutingModule, SharedModule, ReactiveFormsModule,HttpClientModule, BrowserAnimationsModule,MatToolbarModule,MatIconModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
