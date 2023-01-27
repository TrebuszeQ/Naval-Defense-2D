import { Pipe, PipeTransform } from '@angular/core';
// interfaces
import { Level } from 'src/app/level-wrapper/levels/interfaces/level';

@Pipe({
  name: 'levelDescription'
})
export class LevelDescriptionPipe implements PipeTransform {

  transform(value: string, array: Level[]): unknown {
    return value;
  }

  createList(array: Level[]) {

  }
}
