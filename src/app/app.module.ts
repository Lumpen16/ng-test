import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import  {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component'
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'; 
import { ModalComponent } from './modal/modal.component';

import { StoreModule } from "@ngrx/store"
import { usersReducer } from './users.reducer';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    // MatDialogModule,
    StoreModule.forRoot({users: usersReducer}),
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
