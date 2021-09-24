import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreditDebitCardModel } from 'src/app/models/card.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ModalComponent } from '../modal/modal.component';

import { GET_SAVED_CARDS_KEY, DELETED_CARD_SUCCESS_MESSAGE, DELETE_CARD_HEADER } from '../../shared/constants';

@Component({
  selector: 'app-list-card-item',
  templateUrl: './list-card-item.component.html',
  styleUrls: ['./list-card-item.component.scss']
})
export class ListCardItemComponent {
  @Input()
  card!: CreditDebitCardModel;
  @Output() updateList = new EventEmitter();


  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
  ) { }

  removeCard(cardNumber: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { title: DELETE_CARD_HEADER, isRemoveCardComponent: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeCardFromLocalStorage(cardNumber);
        this.commonService.openSnackBar(DELETED_CARD_SUCCESS_MESSAGE)
      }
    });
  }

  removeCardFromLocalStorage(cardNumber: any) {
    let updatedList = this.commonService.fetchSavedCardsFromLocalStorage();;
    updatedList = updatedList.filter(card => card.cardNumber !== cardNumber);
    localStorage.setItem(GET_SAVED_CARDS_KEY, JSON.stringify(updatedList));
    this.updateList.emit(true);
  }

}
