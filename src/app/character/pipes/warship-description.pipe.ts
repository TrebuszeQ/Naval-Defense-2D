import { Pipe, PipeTransform } from '@angular/core';
import { TorpedoType } from 'src/app/character/interfaces/torpedo-type';

@Pipe({
  name: 'warshipDescriptionPipe'
})
export class WarshipDescriptionPipe implements PipeTransform {

  transform(value: string, array: TorpedoType[] | null): unknown {
    return value + ` <br>
    avalaible torpedos are: 
    <ul>
      ${this.checkIfNull(array)}
    <ul>`; 
  }
  
  createList(array: TorpedoType[]) {
    let availableTorpedos: string = '';
    for (const element of array ) {
      availableTorpedos += '\n' + '<li>' + `${element.name}` + '</li>';
    }
    return availableTorpedos;
  }

  async checkIfNull(array: TorpedoType[] | null) {
    if(array == null) {
      return "none";
    }
    else {
      return this.createList(array)
    } 
  }
}

