import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tempUnit' })
export class TempUnitPipe implements PipeTransform {
  transform(temp: number, unitType?: string):number {
    if (unitType === 'celsius') {
      return (temp - 32) * 0.5556;
    } else {
      return temp;
    }
  }
}
