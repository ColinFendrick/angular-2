import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'speedUnit' })
export class SpeedUnitPipe implements PipeTransform {
  transform(speed: number, unitType?: string):string {
    switch(unitType) {
      case 'mph':
        const miles = (speed * 1.6);
        return `${miles.toFixed(2)} mph`;
      case 'kph':
        return `${speed.toFixed(2)} kph`;
      default:
        return `${speed.toFixed(2)} kph`;
    }
  }
}
