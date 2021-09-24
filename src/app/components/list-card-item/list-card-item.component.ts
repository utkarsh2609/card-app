import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreditDebitCardModel } from 'src/app/models/card.model';
import { ModalComponent } from '../modal/modal.component';

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
    public dialog: MatDialog
  ) { }

  removeCard(cardNumber: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { title: 'Delete Card', isRemoveCardComponent: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeCardFromLocalStorage(cardNumber);
      }
    });
  }

  removeCardFromLocalStorage(cardNumber: any) {
    let existingCards = localStorage.getItem('savedCards');
    if (existingCards?.length) {
      let updatedList = JSON.parse(existingCards) as Array<any>;
      updatedList = updatedList.filter(card => card.cardNumber !== cardNumber);
      localStorage.setItem('savedCards', JSON.stringify(updatedList));
    }
    this.updateList.emit(true);
  }

}
