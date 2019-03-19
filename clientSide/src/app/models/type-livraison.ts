import {Tarif} from './tarif';
import {Region} from './region';

export class TypeLivraison {
  id: number;
  name: string;
  info: string;
  tarifs?: Tarif[];

  constructor(val: TypeLivraison) {
    this.id = val.id;
    this.name = val.name;
    this.info = val.info;
  }
}
