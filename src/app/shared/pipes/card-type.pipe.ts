import { Pipe, PipeTransform } from '@angular/core';
import { CreditCard } from 'angular-cc-library';

@Pipe({
  name: 'cardType'
})
export class CardTypePipe implements PipeTransform {

  transform(value: string | undefined): string {
    let cardNum = value ?? '';
    return CreditCard.cardType(cardNum);
  }

}
