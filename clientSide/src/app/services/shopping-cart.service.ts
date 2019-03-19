import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from './data.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProduitPaginate} from '../models/produit-paginate';
import {TokenService} from './token.service';
import {Produit} from '../models/produit';
import {LigneCommande} from '../models/ligne-commande';
import {L} from '@angular/cdk/typings/keycodes';
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  private url = environment.urlServeur;

  private produitPaginatorSource = new BehaviorSubject<LigneCommande[]>(null);
  private _ShoppingCartIsModified: boolean;

  produitPaginator = this.produitPaginatorSource.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private dataService: DataService) {
  }

  setproduitPaginator(data: LigneCommande[]) {
    if (data && data.length === 0) {
      this.dataService.setShoppingCart(0);
    }
    this.produitPaginatorSource.next(data);
  }

  public get2(refresh: boolean = false, id: number[]): Observable<LigneCommande[]> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSource.getValue()) {
        observer.next(this.produitPaginatorSource.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('id', id.join(', '));
      this.http.get<Produit[]>(this.url + '/GAPRODBLIDWP', {params: params}).subscribe(value => {
        const LCs = this.getShoppingCart();
        this.dataService.setShoppingCart(0);
        LCs.forEach(value1 => {
          this.dataService.addShoppingCart(value1.quantite);
          value1.produit = value.find(value2 => value2.id === value1.produit_id);
        });
        console.log(LCs);
        this.produitPaginatorSource.next(LCs);
        observer.next(this.produitPaginatorSource.getValue());
        observer.complete();
      });
    });
  }

  public get(refresh: boolean = false): Observable<LigneCommande[]> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSource.getValue()) {
        observer.next(this.produitPaginatorSource.getValue());
        return observer.complete();
      }
      this.http.get<LigneCommande[]>(this.url + '/GAPSC').subscribe(value => {

        this.produitPaginatorSource.next(value);
        this.dataService.setShoppingCart(0);
        value.forEach(value1 => {
          this.dataService.addShoppingCart(value1.quantite);
        });
        observer.next(this.produitPaginatorSource.getValue());
        observer.complete();
      }, error1 => {
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DPSC/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.url + '/DAPSC');
  }

  save(LC: LigneCommande): Observable<any> {
    return this.http.post<any>(this.url + '/SPSC', LC);
  }

  update(id: number, quantite: number): Observable<any> {
    return this.http.put<any>(this.url + '/UPSC', {id: id, quantite: quantite});
  }

  addShoppingCart(LC: LigneCommande) {
    if (this.tokenService.loggedIn()) {
      this.addShoppingCartAfterLogin(LC);
    } else {
      this.addShoppingCartBeforeLogin(LC);
    }
  }

  addQuantitetShoppingCart(LC: LigneCommande) {
    if (this.tokenService.loggedIn()) {
      this.addQuantitetShoppingCartAfterLogin(LC);
    } else {
      this.addQuantitetShoppingCartBeforeLogin(LC);
    }
  }

  addQuantitetShoppingCartAfterLogin(FLC: LigneCommande) {
    this.update(FLC.id, FLC.quantite).subscribe(value => {
      this.dataService.addShoppingCart();
    });
  }

  addQuantitetShoppingCartBeforeLogin(LC: LigneCommande) {
    this.dataService.addShoppingCart();
    this.changeQuantiteFromlocalStorage(LC);
  }

  removeQuantitetShoppingCart(LC: LigneCommande) {
    if (this.tokenService.loggedIn()) {
      this.removeQuantitetShoppingCartAfterLogin(LC);
    } else {
      this.removeQuantitetShoppingCartBeforeLogin(LC);
    }
  }

  removeQuantitetShoppingCartAfterLogin(FLC: LigneCommande) {
    this.update(FLC.id, FLC.quantite).subscribe(value => {
      this.dataService.removeShoppingCart();
    });
  }

  removeQuantitetShoppingCartBeforeLogin(LC: LigneCommande) {
    this.dataService.removeShoppingCart();
    this.changeQuantiteFromlocalStorage(LC);
  }

  syncFromLocaleToDatabase() {
    const LCs = this.produitPaginatorSource.getValue();
    this.get(true).subscribe(value => {
      LCs.forEach(value1 => {
        this.addShoppingCartAfterLogin(value1);
      });
      localStorage.setItem('ShoppingCart', JSON.stringify([]));
    });
  }

  addShoppingCartAfterLogin(LC: LigneCommande) {
    const FLC = this.existShoppingCart(LC.produit_id);
    if (!FLC) {
      this.save(LC).subscribe(value => {
        this.dataService.addShoppingCart(LC.quantite);
        const tmp = this.produitPaginatorSource.getValue();
        tmp.push(LC);
        this.produitPaginatorSource.next(tmp);
        this.ShoppingCartIsModified = true;
      }, error1 => {
        console.log(error1);
      });
    } else {

      if (FLC.quantite + LC.quantite <= LC.produit.article.stock) {
        this.update(FLC.id, FLC.quantite + LC.quantite).subscribe(value => {
          FLC.quantite = FLC.quantite + LC.quantite;
          this.produitPaginatorSource.next(this.produitPaginatorSource.getValue());
          this.dataService.addShoppingCart(LC.quantite);
        }, error1 => console.log(error1));
      }
    }
  }

  quantiteTotaleDeMemeProduit(id: number): number {
    return this.produitPaginatorSource.getValue().filter(value => value.produit_id === id)
      .map(value => value.quantite)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  addShoppingCartBeforeLogin(LC: LigneCommande) {
    const arr = this.getShoppingCart();
    console.log(this.produitPaginatorSource.getValue());
    const FLC = this.existShoppingCart(LC.produit_id);
    if (!FLC) {
      const tmp = this.produitPaginatorSource.getValue();
      tmp.push(LC);
      this.produitPaginatorSource.next(tmp);
      arr.push(LC.getNewInstanceLigneCommande());
      this.dataService.addShoppingCart(LC.quantite);
      localStorage.setItem('ShoppingCart', JSON.stringify(arr));
    } else {
      if (FLC.quantite + LC.quantite <= LC.produit.article.stock) {
        FLC.quantite = FLC.quantite + LC.quantite;
        this.produitPaginatorSource.next(this.produitPaginatorSource.getValue());
        this.dataService.addShoppingCart(LC.quantite);
        this.changeQuantiteFromlocalStorage(FLC);
      }
    }
  }


  exist(id: number, arr: Array<number>): boolean {
    const res = arr.find(value => value === id);
    return res ? true : false;
  }

  changeQuantiteFromlocalStorage(LC: LigneCommande) {
    const arr = this.getShoppingCart();
    const FLC = arr.find(value => value.produit_id === LC.produit_id);
    FLC.quantite = LC.quantite;
    localStorage.setItem('ShoppingCart', JSON.stringify(arr));
  }


  existShoppingCart(id: number): LigneCommande {
    const res = this.produitPaginatorSource.getValue().find(value => value.produit_id === id);
    return res ? res : null;
  }


  getShoppingCart(): LigneCommande[] {
    const ShoppingCart = localStorage.getItem('ShoppingCart');
    return JSON.parse(ShoppingCart)as LigneCommande[];
  }

  getShoppingCartId(): number[] {
    const LCs = this.getShoppingCart();
    return LCs.map(value => value.produit_id);
  }

  clearShoppingCartAfterLogin() {
    this.deleteAll().subscribe(value => {
      this.produitPaginatorSource.next([]);
      this.dataService.setShoppingCart(0);

    });
  }

  clearShoppingCartBeforeLogin() {
    localStorage.setItem('ShoppingCart', JSON.stringify([]));
    this.produitPaginatorSource.next([]);
    this.dataService.setShoppingCart(0);
  }

  clearShoppingCart() {
    if (this.tokenService.loggedIn()) {
      this.clearShoppingCartAfterLogin();
    } else {
      this.clearShoppingCartBeforeLogin();
    }
  }

  removeItemFromShoppingCartAfterLogin(LC: LigneCommande) {
    this.delete(LC.id).subscribe(value => {
      this.produitPaginatorSource.next(this.produitPaginatorSource.getValue().filter(value2 => value2.id !== LC.id));
      this.dataService.removeShoppingCart(LC.quantite);
    });
  }


  removeItemFromShoppingCartBeforeLogin(LC: LigneCommande) {
    let arr = this.getShoppingCart();
    arr = arr.filter(value => value.produit_id !== LC.produit_id);
    localStorage.setItem('ShoppingCart', JSON.stringify(arr));
    this.produitPaginatorSource.next(this.produitPaginatorSource.getValue().filter(value => value.produit_id !== LC.produit_id));
    this.dataService.removeShoppingCart(LC.quantite);
  }

  removeItemFromShoppingCart(LC: LigneCommande) {
    if (this.tokenService.loggedIn()) {
      this.removeItemFromShoppingCartAfterLogin(LC);
    } else {
      this.removeItemFromShoppingCartBeforeLogin(LC);
    }
  }


  get ShoppingCartIsModified(): boolean {
    return this._ShoppingCartIsModified;
  }

  set ShoppingCartIsModified(value: boolean) {
    this._ShoppingCartIsModified = value;
  }

}
