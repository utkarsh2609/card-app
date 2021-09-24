import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditDebitCardModel } from 'src/app/models/card.model';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.data.isSaveCardComponent) {
      this.enableSaveCardButton = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSaveButton($event: any){
    this.enableSaveCardButton = $event.isValid;
    this.cardToBeSaved = $event.formDate;
  }

  addNewCard() {
    const newCard = new CreditDebitCardModel();
    newCard.cardNumber = this.cardToBeSaved.cardNumber;
    newCard.cardCVV = this.cardToBeSaved.cardCVV;
    newCard.cardExpiryDate = this.cardToBeSaved.cardExpiryDate;
    if(!this.isCardAlreadyAdded(newCard.cardNumber)) {
      let savedCards = localStorage.getItem('savedCards');
      if(savedCards) {
        let listOfCards = JSON.parse(savedCards);
        listOfCards.push(newCard);
        localStorage.setItem('savedCards', JSON.stringify(listOfCards));
      }
      this.dialogRef.close(true);
    } else {
      this.openSnackBar('This card already exists.');
    }
  }

  isCardAlreadyAdded(cardNumber: string | undefined): boolean{
    let existingCards = localStorage.getItem('savedCards');
    if (existingCards?.length) {
      let updatedList = JSON.parse(existingCards) as Array<CreditDebitCardModel>;
      updatedList = updatedList.filter(card => card.cardNumber === cardNumber);
      console.log('CHECK', updatedList, cardNumber)
      return updatedList.length ? true: false;
    }
    return false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

}
