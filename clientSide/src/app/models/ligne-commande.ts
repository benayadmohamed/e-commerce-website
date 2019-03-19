import {Produit} from './produit';

export class LigneCommande {
  id: any;
  quantite: number;
  sousTotal: number;
  commande_id: number;
  produit_id: number;
  produit?: Produit;

  copy(): LigneCommande {
    const ele = new LigneCommande();
    ele.id = this.id;
    ele.quantite = this.quantite;
    ele.sousTotal = this.sousTotal;
    ele.produit_id = this.produit_id;
    return ele;
  }

  getNewInstanceLigneCommande() {
    const LC = new LigneCommande();
    LC.produit_id = this.produit_id;
    LC.id = this.id;
    LC.quantite = this.quantite;
    return LC;
  }
}
