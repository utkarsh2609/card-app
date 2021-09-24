import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from './components/modal/modal.component';
import { CreditDebitCardModel } from './models/card.model';

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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchSavedCardsFromLocalStorage();
  }

  fetchSavedCardsFromLocalStorage(){
    let existingCards = localStorage.getItem('savedCards');
    if(existingCards?.length) {
      this.savedCardList = JSON.parse(existingCards);
    } else {
      localStorage.setItem('savedCards', JSON.stringify(this.savedCardList))
    }
  }

  addCard() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { title: 'Add New Card', isSaveCardComponent: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.openSnackBar('New Card Added Successfully');
        let existingCards = localStorage.getItem('savedCards');
        if (existingCards?.length) {
          this.savedCardList = JSON.parse(existingCards);
        }
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
