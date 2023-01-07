import { Pipe, PipeTransform } from '@angular/core';
import { TorpedoType } from '../interfaces/torpedo-type';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, array: TorpedoType[]): unknown {
    return value + ` <br>
    Avalaible torpedes are: 
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

