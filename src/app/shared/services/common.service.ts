import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditCard } from 'angular-cc-library';
import { CreditDebitCardModel } from 'src/app/models/card.model';
import { GET_SAVED_CARDS_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  fetchSavedCardsFromLocalStorage(): Array<CreditDebitCardModel> {
    let cardsSavedInLocalStorage = new Array<CreditDebitCardModel>();
    let existingCards = localStorage.getItem(GET_SAVED_CARDS_KEY);
    if (existingCards?.length) {
      cardsSavedInLocalStorage = JSON.parse(existingCards) as Array<CreditDebitCardModel>;
    }
    return cardsSavedInLocalStorage;
  }
}
