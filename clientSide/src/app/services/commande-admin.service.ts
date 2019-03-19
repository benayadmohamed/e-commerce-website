import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommandePaginate} from '../models/commande-paginate';
import {Region} from '../models/region';
import {Commande} from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeAdminService {


  private url = environment.urlServeur;


  private commandesNewsSource = new BehaviorSubject<CommandePaginate>(null);
  commandeNews = this.commandesNewsSource.asObservable();

  private commandesShippedSource = new BehaviorSubject<CommandePaginate>(null);
  commandesShipped = this.commandesShippedSource.asObservable();

  private commandesDeliveredSource = new BehaviorSubject<CommandePaginate>(null);
  commandesDelivered = this.commandesDeliveredSource.asObservable();

  private commandesClosedSource = new BehaviorSubject<CommandePaginate>(null);
  commandesClosed = this.commandesClosedSource.asObservable();

  private loadSource = new BehaviorSubject<boolean>(false);
  load = this.loadSource.asObservable();


  setLoad(data: boolean) {
    this.loadSource.next(data);
  }

  setCommandeClosed(data: CommandePaginate) {
    this.commandesClosedSource.next(data);
  }

  setCommandeDelivered(data: CommandePaginate) {
    this.commandesDeliveredSource.next(data);
  }

  setCommandeShipped(data: CommandePaginate) {
    this.commandesShippedSource.next(data);
  }

  setCommandeNews(data: CommandePaginate) {
    this.commandesNewsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }


  public getNews(filter = '',
                 sort = 'asc',
                 sortAct = 'dateC',
                 refresh: boolean = false,
                 page = (this.commandesNewsSource.getValue()) ? this.commandesNewsSource.getValue().current_page : 1,
                 perPage = (this.commandesNewsSource.getValue()) ? this.commandesNewsSource.getValue().per_page : 12
  ): Observable<CommandePaginate> {
    return new Observable(observer => {
      if (!refresh && this.commandesNewsSource.getValue()) {
        observer.next(this.commandesNewsSource.getValue());
        return observer.complete();
      }
      this.setLoad(true);
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('statut', 'new')
        .set('filter', filter)
        .set('sortAct', sortAct)
        .set('sort', sort);
      let ch = 'GACMDA';
      if (!this.tokenService.isValidAdmin()) {
        ch = 'GACMD';
      }
      this.http.get<CommandePaginate>(this.url + '/' + ch, {params: params}).subscribe(value => {
        this.commandesNewsSource.next(value);
        this.setLoad(false);
        observer.next(this.commandesNewsSource.getValue());
        observer.complete();
      });
    });
  }

  public getShipped(filter = '',
                    sort = 'asc',
                    sortAct = 'dateC',
                    refresh: boolean = false,
                    page = (this.commandesShippedSource.getValue()) ? this.commandesShippedSource.getValue().current_page : 1,
                    perPage = (this.commandesShippedSource.getValue()) ? this.commandesShippedSource.getValue().per_page : 12
  ): Observable<CommandePaginate> {
    return new Observable(observer => {
      if (!refresh && this.commandesShippedSource.getValue()) {
        observer.next(this.commandesShippedSource.getValue());
        return observer.complete();
      }
      this.setLoad(true);

      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('statut', 'shipped')
        .set('filter', filter)
        .set('sortAct', sortAct)
        .set('sort', sort);
      let ch = 'GACMDA';
      if (!this.tokenService.isValidAdmin()) {
        ch = 'GACMD';
      }
      this.http.get<CommandePaginate>(this.url + '/' + ch, {params: params}).subscribe(value => {
        this.commandesShippedSource.next(value);
        this.setLoad(false);
        observer.next(this.commandesShippedSource.getValue());
        observer.complete();
      });
    });
  }

  public getDelivered(filter = '',
                      sort = 'asc',
                      sortAct = 'dateC',
                      refresh: boolean = false,
                      page = (this.commandesDeliveredSource.getValue()) ? this.commandesDeliveredSource.getValue().current_page : 1,
                      perPage = (this.commandesDeliveredSource.getValue()) ? this.commandesDeliveredSource.getValue().per_page : 12
  ): Observable<CommandePaginate> {
    return new Observable(observer => {
      if (!refresh && this.commandesDeliveredSource.getValue()) {
        observer.next(this.commandesDeliveredSource.getValue());
        return observer.complete();
      }
      this.setLoad(true);

      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('statut', 'delivered')
        .set('filter', filter)
        .set('sortAct', sortAct)
        .set('sort', sort);
      let ch = 'GACMDA';
      if (!this.tokenService.isValidAdmin()) {
        ch = 'GACMD';
      }
      this.http.get<CommandePaginate>(this.url + '/' + ch, {params: params}).subscribe(value => {
        this.commandesDeliveredSource.next(value);
        this.setLoad(false);
        observer.next(this.commandesDeliveredSource.getValue());
        observer.complete();
      });
    });
  }

  public getClosed(filter = '',
                   sort = 'asc',
                   sortAct = 'dateC',
                   refresh: boolean = false,
                   page = (this.commandesClosedSource.getValue()) ? this.commandesClosedSource.getValue().current_page : 1,
                   perPage = (this.commandesClosedSource.getValue()) ? this.commandesClosedSource.getValue().per_page : 12
  ): Observable<CommandePaginate> {
    return new Observable(observer => {
      if (!refresh && this.commandesClosedSource.getValue()) {
        observer.next(this.commandesClosedSource.getValue());
        return observer.complete();
      }
      this.setLoad(true);

      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('statut', 'closed')
        .set('filter', filter)
        .set('sortAct', sortAct)
        .set('sort', sort);
      this.http.get<CommandePaginate>(this.url + '/GACMDA', {params: params}).subscribe(value => {
        this.commandesClosedSource.next(value);
        this.setLoad(false);
        observer.next(this.commandesClosedSource.getValue());
        observer.complete();
      });
    });
  }


  update(value: Commande): Observable<any> {
    return this.http.put<any>(this.url + '/UCMDA', value);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DCMDA/' + id);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/GCMDA/' + id);
  }


  changeStatut(element: Commande) {
    switch (element.statut) {
      case 'new': {
        const tmp = this.commandesNewsSource.getValue();
        tmp.data.unshift(element);
        tmp.total++;
        this.setCommandeNews(tmp);
        return;
      }
      case 'shipped': {
        const tmp = this.commandesShippedSource.getValue();
        tmp.total++;
        tmp.data.unshift(element);
        this.setCommandeShipped(tmp);
        return;
      }
      case 'delivered': {
        const tmp = this.commandesDeliveredSource.getValue();
        tmp.total++;
        tmp.data.unshift(element);
        this.setCommandeDelivered(tmp);
        return;
      }
      case 'closed': {
        const tmp = this.commandesClosedSource.getValue();
        tmp.total++;
        tmp.data.unshift(element);
        this.setCommandeClosed(tmp);
        return;
      }
    }
  }
}
