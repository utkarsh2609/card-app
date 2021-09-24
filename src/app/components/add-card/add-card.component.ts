import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { CreditCardValidators } from 'angular-cc-library';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddCardComponent implements OnInit {
  addCardForm!: FormGroup;
  date = new FormControl(moment());

  @Output() isAddCardFormValid = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createAddCardForm();
    this.addCardForm.valueChanges.subscribe(validity => {
      this.isAddCardFormValid.emit({isValid: this.addCardForm.valid, formDate: this.addCardForm.value})
    })
  }

  createAddCardForm(): void {
    this.addCardForm = this.fb.group({
      cardNumber: ['', [CreditCardValidators.validateCCNumber]],
      cardExpiryDate: [new FormControl(moment()), [this.validateExpDate]],
      cardCVV: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
  }


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = moment(this.addCardForm.controls.cardExpiryDate.value);
    ctrlValue.year(normalizedYear.year());
    this.addCardForm.controls.cardExpiryDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = moment(this.addCardForm.controls.cardExpiryDate.value);
    ctrlValue.month(normalizedMonth.month());
    this.addCardForm.controls.cardExpiryDate.setValue(ctrlValue);
    datepicker.close();
  }

  getError(formControl: any): string {
    if(formControl.errors.required) {
      return "Required";
    }
    if(formControl.errors.ccNumber) {
      return "Invalid Card Number";
    }
    if(formControl.errors.expDate) {
      return "Card Expired";
    }
    if(formControl.errors.minlength) {
      return "CVV is Incorrect";
    }
    return '';
  }

  validateExpDate(control: AbstractControl): ValidationErrors | null {
    if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
      return {expDate: true};
    }
    
    if(control.value) {
      const today = new Date();
      const inputDateCorrect = moment(control.value._d).isSameOrAfter(moment(today));
      return inputDateCorrect ? null: {expDate: true}
    }

    return {expDate: true};
  }

}
