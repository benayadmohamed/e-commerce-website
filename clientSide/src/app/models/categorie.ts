import {SousCategorie} from './sous-categorie';

export class Categorie {
  id: number;
  name: string;
  sexe: string;
  sous_categories ?: SousCategorie[];

  constructor(val: Categorie) {
    this.id = val.id;
    this.name = val.name;
    this.sexe = val.sexe;
  }
}
