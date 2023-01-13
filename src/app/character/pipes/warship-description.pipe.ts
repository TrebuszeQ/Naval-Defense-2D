import { Pipe, PipeTransform } from '@angular/core';
import { TorpedoType } from 'src/app/character/interfaces/torpedo-type';

@Pipe({
  name: 'warshipDescriptionPipe'
})
export class WarshipDescriptionPipe implements PipeTransform {

  transform(value: string, array: TorpedoType[]): unknown {
    return value + ` <br>
    avalaible torpedes are: 
    <ul>
      ${this.createList(array)}
    <ul>`; 
  }
  
  createList(array: TorpedoType[]) {
    let availableTorpedos: string = '';
    for (const element of array ) {
      availableTorpedos += '\n' + '<li>' + `${element.name}` + '</li>';
    }
    return availableTorpedos;
  }
}

