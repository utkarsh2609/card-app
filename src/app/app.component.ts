import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreditDebitCardModel } from './models/card.model';
import { CommonService } from './shared/services/common.service';
import { ModalComponent } from './components/modal/modal.component';

import {GET_SAVED_CARDS_KEY, ADDED_CARD_SUCCESS_MESSAGE, ADD_CARD_HEADER} from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'card-app';
  savedCardList = new Array<CreditDebitCardModel>();

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getSavedCards();
  }

  getSavedCards(){
    this.savedCardList = this.commonService.fetchSavedCardsFromLocalStorage();
    if(!this.savedCardList.length) {
      localStorage.setItem(GET_SAVED_CARDS_KEY, JSON.stringify(this.savedCardList))
    }
  }

  addCard() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { title: ADD_CARD_HEADER, isSaveCardComponent: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.commonService.openSnackBar(ADDED_CARD_SUCCESS_MESSAGE);
        let existingCards = localStorage.getItem(GET_SAVED_CARDS_KEY);
        if (existingCards?.length) {
          this.savedCardList = JSON.parse(existingCards);
        }
      }
    });
  }
}
