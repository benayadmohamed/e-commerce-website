import {TypeLivraison} from './type-livraison';

export class Livraison {
  id: number;
  typeLivraison_id: number;
  commande_id: number;
  type_livraison ?: TypeLivraison;
}
