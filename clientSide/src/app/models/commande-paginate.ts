import {Paginate} from './paginate';
import {Produit} from './produit';
import {Commande} from './commande';

export class CommandePaginate extends Paginate {
  filterValue = '';
  sortDir = 'desc';
  sortAct = 'dateC';
  data: Commande[];
}
