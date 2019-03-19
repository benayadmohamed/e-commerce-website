import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Categorie} from '../models/categorie';
import {environment} from '../../environments/environment';
import {Commande} from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private url = environment.urlServeur;

  private commandeSource = new BehaviorSubject<Commande>(null);
  commande = this.commandeSource.asObservable();

  setCommande(data: Commande) {
    this.commandeSource.next(data);
  }

}
