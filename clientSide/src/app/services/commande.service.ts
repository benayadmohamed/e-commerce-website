import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Reduction} from '../models/reduction';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {Commande} from '../models/commande';
import {ProduitPaginate} from '../models/produit-paginate';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {


  private url = environment.urlServeur;
  private commandesSource = new BehaviorSubject<Commande[]>(null);
  commandes = this.commandesSource.asObservable();

  setCommandes(data: Commande[]) {
    this.commandesSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Commande[]> {
    return new Observable(observer => {
      if (!refresh && this.commandesSource.getValue()) {
        observer.next(this.commandesSource.getValue());
        return observer.complete();
      }
      this.http.get<Commande[]>(this.url + '/GACMD').subscribe(value => {
        this.setCommandes(value);
        observer.next(this.commandesSource.getValue());
        observer.complete();
      });
    });
  }

  save(value: Commande): Observable<{ articles: Article[], idCmd: number }> {
    return this.http.post<any>(this.url + '/SCMD', value);
  }
}
