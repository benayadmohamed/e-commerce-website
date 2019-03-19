import {Color} from './color';

export class Reduction {

  id: number;
  valeurPourcentage: number;
  constructor(val: Reduction) {
    this.id = val.id;
    this.valeurPourcentage = val.valeurPourcentage;
  }
}
