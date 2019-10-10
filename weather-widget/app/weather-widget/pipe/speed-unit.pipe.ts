import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'speedUnit' })
export class SpeedUnitPipe implements PipeTransform {
  transform(speed: number, unitType?: string):string {
    switch(unitType) {
      case 'mph':
        const miles = (speed * 1.6);
        return `${miles && miles.toFixed(0)} mph`;
      case 'kph':
        return `${speed && speed.toFixed(0)} kph`;
      default:
        return `${speed && speed.toFixed(0)} kph`;
    }
  }
}
