import { Pipe, PipeTransform } from '@angular/core';
// interfaces
import { Levels } from 'src/app/level-wrapper/levels/interfaces/levels';

@Pipe({
  name: 'levelDescription'
})
export class LevelDescriptionPipe implements PipeTransform {

  transform(value: string, array: Levels[]): unknown {
    return value;
  }

  createList(array: Levels[]) {

  }
}
