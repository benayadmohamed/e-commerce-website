import {Ville} from './ville';

export class Tarif {
  id: number;
  montant: number;
  typeLivraison_id: number;
  ville_id: number;

  constructor(val: Tarif) {
    this.id = val.id;
    this.montant = val.montant;
    this.ville_id = val.ville_id;
    this.typeLivraison_id = val.typeLivraison_id;
  }
}
