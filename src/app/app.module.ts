import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CreditCardDirectivesModule } from 'angular-cc-library';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCardComponent } from './components/add-card/add-card.component';
import { RemoveCardComponent } from './components/remove-card/remove-card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ListCardItemComponent } from './components/list-card-item/list-card-item.component';
import { MaterialModule } from './material/material.module';
import { ModalComponent } from './components/modal/modal.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AddCardComponent,
    RemoveCardComponent,
    CardListComponent,
    ListCardItemComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
