export class SousCategorie {
  id: number;
  name: string;
  categorie_id: number;

  constructor(val: SousCategorie) {
    this.id = val.id;
    this.name = val.name;
    this.categorie_id = val.categorie_id;
  }
}
