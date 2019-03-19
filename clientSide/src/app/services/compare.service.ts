import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {ProduitPaginate} from '../models/produit-paginate';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  private url = environment.urlServeur;

  private produitPaginatorSource = new BehaviorSubject<ProduitPaginate>(null);
  private _compareIsModified: boolean;

  produitPaginator = this.produitPaginatorSource.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private dataService: DataService) {
  }

  setproduitPaginator(data: ProduitPaginate) {
    this.produitPaginatorSource.next(data);
  }

  public getByListId(
    refresh: boolean = false,
    page = 1,
    perPage = 12,
    id: number[]): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSource.getValue()) {
        observer.next(this.produitPaginatorSource.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('id', id.join(', '));
      this.http.get<ProduitPaginate>(this.url + '/GAPRODBLID', {params: params}).subscribe(value => {
        this.dataService.setCompares(value.total);
        this.produitPaginatorSource.next(value);
        observer.next(this.produitPaginatorSource.getValue());
        observer.complete();
      });
    });
  }

  public get(
    refresh: boolean = false,
    page = 1,
    perPage = 12): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSource.getValue()) {
        observer.next(this.produitPaginatorSource.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString());
      this.http.get<ProduitPaginate>(this.url + '/GAPCOM', {params: params}).subscribe(value => {
        this.dataService.setCompares(value.total);
        this.produitPaginatorSource.next(value);
        observer.next(this.produitPaginatorSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DPCOM/' + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.url + '/DAPCOM');
  }

  save(ids: number[]): Observable<any> {
    return this.http.post<any>(this.url + '/SPCOM', {ids: ids});
  }

  save2(id: number): Observable<any> {
    return this.http.post<any>(this.url + '/SPUCOM', {id: id});
  }


  get compareIsModified(): boolean {
    return this._compareIsModified;
  }

  set compareIsModified(value: boolean) {
    this._compareIsModified = value;
  }

  getCompare(): number[] {
    const compare = localStorage.getItem('compares');
    return JSON.parse(compare)as number[];
  }

  syncFromLocaleToDatabase(): Observable<number> {
    const ids = this.getCompare();
    return new Observable<number>(subscriber => {
      if (!ids || !ids.length) {
        subscriber.next(0);
        return subscriber.complete();
      }
      this.save(ids).subscribe(value => {
        localStorage.setItem('compares', JSON.stringify([]));
        subscriber.next(value.attached.length);
        subscriber.complete();
      }, error1 => {
        localStorage.setItem('compares', JSON.stringify([]));
        subscriber.next(0);
        subscriber.complete();
        console.log(error1);
      });
    });

  }

  addToCompareAfterLogin(id: number) {
    this.save2(id).subscribe(value => {
      this.dataService.addCompare(value.attached.length);
      this.dataService.removeCompare(value.detached.length);
      this.compareIsModified = true;
    }, error1 => {
      console.log(error1);
    });
  }

  addToCompareBeforeLogin(id: number) {
    const arr = this.getCompare();
    const res = arr.find(value => value === id);
    if (!res) {
      arr.push(id);
      this.dataService.addCompare();
      localStorage.setItem('compares', JSON.stringify(arr));
      this.compareIsModified = true;
    }
  }

  removeItemFromCompareAfterLogin(id: number) {
    this.delete(id).subscribe(value => {
      this.dataService.removeCompare();
      const PP = this.produitPaginatorSource.getValue();
      PP.data = PP.data.filter(value2 => value2.id !== id);
      this.produitPaginatorSource.next(PP);
    });
  }

  removeItemFromCompareBeforeLogin(id: number) {
    let arr = this.getCompare();
    arr = arr.filter(value => value !== id);
    localStorage.setItem('compares', JSON.stringify(arr));
    const PP = this.produitPaginatorSource.getValue();
    PP.data = PP.data.filter(value2 => value2.id !== id);
    this.produitPaginatorSource.next(PP);
    this.dataService.removeCompare();
  }


  clearCompareAfterLogin() {
    this.deleteAll().subscribe(value => {
      this.dataService.setCompares(0);
      const PP = this.produitPaginatorSource.getValue();
      PP.data = [];
      this.produitPaginatorSource.next(PP);
    });
  }

  clearCompareBeforeLogin() {
    localStorage.setItem('compares', JSON.stringify([]));
    const PP = this.produitPaginatorSource.getValue();
    PP.data = [];
    this.produitPaginatorSource.next(PP);
    this.dataService.setCompares(0);
  }

  clearCompare() {
    if (this.tokenService.loggedIn()) {
      this.clearCompareAfterLogin();
    } else {
      this.clearCompareBeforeLogin();
    }
  }

  addToCompare(id) {
    if (this.tokenService.loggedIn()) {
      this.addToCompareAfterLogin(id);
    } else {
      this.addToCompareBeforeLogin(id);
    }
  }

  removeItemFromCompare(id) {
    if (this.tokenService.loggedIn()) {
      this.removeItemFromCompareAfterLogin(id);
    } else {
      this.removeItemFromCompareBeforeLogin(id);
    }
  }
}
