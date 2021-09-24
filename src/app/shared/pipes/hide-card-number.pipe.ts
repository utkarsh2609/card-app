import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCardNumber'
})
export class HideCardNumberPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(!value) {
      return '';
    } else {
      const modifiedStringLength = value.length - 4;
      const mask = new Array(modifiedStringLength).join("X");
      let stringToBeModified = value.slice(3,modifiedStringLength);
      return value.replace(stringToBeModified, mask);
    }
  }

}
