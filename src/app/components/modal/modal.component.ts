import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreditDebitCardModel } from 'src/app/models/card.model';
import { CommonService } from 'src/app/shared/services/common.service';

import { GET_SAVED_CARDS_KEY, CARD_ALREADY_EXISTS_MESSAGE } from '../../shared/constants';

export interface DialogData {
  title: string;
  isSaveCardComponent?: boolean;
  isRemoveCardComponent?: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  enableSaveCardButton = true;
  cardToBeSaved: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    if (this.data.isSaveCardComponent) {
      this.enableSaveCardButton = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSaveButton($event: any) {
    this.enableSaveCardButton = $event.isValid;
    this.cardToBeSaved = $event.formDate;
  }

  addNewCard() {
    const newCard = new CreditDebitCardModel();
    newCard.cardNumber = this.cardToBeSaved.cardNumber;
    newCard.cardCVV = this.cardToBeSaved.cardCVV;
    newCard.cardExpiryDate = this.cardToBeSaved.cardExpiryDate;
    if (!this.isCardAlreadyAdded(newCard.cardNumber)) {
      let listOfCards = this.commonService.fetchSavedCardsFromLocalStorage();
      listOfCards.push(newCard);
      localStorage.setItem(GET_SAVED_CARDS_KEY, JSON.stringify(listOfCards));
      this.dialogRef.close(true);
    } else {
      this.commonService.openSnackBar(CARD_ALREADY_EXISTS_MESSAGE);
    }
  }

  isCardAlreadyAdded(cardNumber: string | undefined): boolean {
    let updatedList = this.commonService.fetchSavedCardsFromLocalStorage();
    updatedList = updatedList.filter(card => card.cardNumber === cardNumber);
    return updatedList.length ? true : false;
  }

}
