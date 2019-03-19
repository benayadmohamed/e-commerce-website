import {Article} from './article';
import {Categorie} from './categorie';
import {LigneCommande} from './ligne-commande';
import {Reduction} from './reduction';

export class Produit {
  id: number;
  prix: number;
  tva: number;
  name: string;
  descriptif: string;
  marque_id: number;
  categorie_id: number;
  reduction_id: number;
  sousCategorie_id: number;
  // article: Article = new Article();
  categorie?: Categorie = new Categorie({id: 0, name: '', sexe: ''});
  article?: Article = new Article();
  reduction?: Reduction;
  ligneCommandes?: LigneCommande[] = [];
  ligneCommande ?: LigneCommande = new LigneCommande();
}
