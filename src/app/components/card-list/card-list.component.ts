import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreditDebitCardModel } from 'src/app/models/card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() savedCards = new Array<CreditDebitCardModel>();
  @Output() updateList = new EventEmitter();

  fetchSavedCards() {
    this.updateList.emit(true);
  }

}
