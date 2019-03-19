import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Repository} from '../models/repository';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Produit} from '../models/produit';
import {headersToString} from 'selenium-webdriver/http';
import {InfoSite} from '../models/info-site';
import {Image} from '../models/image';
import {ProduitPaginate} from '../models/produit-paginate';
import {CritereRecherche} from '../models/critere-recherche';
import {DataService} from './data.service';
import {LigneCommande} from '../models/ligne-commande';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private url = environment.urlServeur;

  produitNewArrivale: ProduitPaginate;
  produitOnSale: ProduitPaginate;

  private produitPaginatorSource = new BehaviorSubject<ProduitPaginate>(null);
  produitPaginator = this.produitPaginatorSource.asObservable();

  private produitPaginatorSourceAdmin = new BehaviorSubject<ProduitPaginate>(null);
  produitPaginatorAdmin = this.produitPaginatorSourceAdmin.asObservable();

  private loadSource = new BehaviorSubject<boolean>(false);
  load = this.loadSource.asObservable();


  setLoad(data: boolean) {
    this.loadSource.next(data);
  }

  setproduitPaginatorAdmin(data: ProduitPaginate) {
    this.produitPaginatorSourceAdmin.next(data);
  }

  setproduitPaginator(data: ProduitPaginate) {
    this.produitPaginatorSource.next(data);
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private dataService: DataService,
  ) {
  }


  public getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.url + '/GAPRODBID/' + id);
  }


  public get(
    refresh: boolean = false,
    page = 1,
    perPage = 12,
    critereRecherche: CritereRecherche = new CritereRecherche()
  ): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSource.getValue()) {
        observer.next(this.produitPaginatorSource.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('categorie_id', critereRecherche.categorie_id ? critereRecherche.categorie_id.toString() : '')
        .set('sousCategorie_id', critereRecherche.sousCategorie_id ? critereRecherche.sousCategorie_id.toString() : '')
        .set('prixFrom', critereRecherche.prixFrom ? critereRecherche.prixFrom.toString() : '')
        .set('prixTo', critereRecherche.prixTo ? critereRecherche.prixTo.toString() : '')
        .set('colors_id', critereRecherche.colors_id ? critereRecherche.colors_id.join(', ') : '')
        .set('matieres_id', critereRecherche.matieres_id ? critereRecherche.matieres_id.join(', ') : '')
        .set('marque_id', critereRecherche.marque_id ? critereRecherche.marque_id.toString() : '');
      this.http.get<ProduitPaginate>(this.url + '/GAPROD', {params: params}).subscribe(value => {
        this.produitPaginatorSource.next(value);
        observer.next(this.produitPaginatorSource.getValue());
        observer.complete();
      });
    });
  }

  public getByName(
    name: string,
    refresh: boolean = false,
    page = 1,
    perPage = 12): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitPaginatorSourceAdmin.getValue()) {
        observer.next(this.produitPaginatorSourceAdmin.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('name', name);
      this.http.get<ProduitPaginate>(this.url + '/GAPRODBN', {params: params}).subscribe(value => {
        this.produitPaginatorSourceAdmin.next(value);
        observer.next(this.produitPaginatorSourceAdmin.getValue());
        observer.complete();
      });
    });
  }

  public getNewArrivale(
    page = 1,
    perPage = 6, refresh = false, url: string = this.url + '/GAPRODNA?page=' + page): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitNewArrivale) {
        observer.next(this.produitNewArrivale);
        return observer.complete();
      }
      this.loadSource.next(true);
      this.http.get<ProduitPaginate>(url + '&perPage=' + perPage).subscribe(value => {
        this.produitNewArrivale = value;
        this.loadSource.next(false);
        observer.next(this.produitNewArrivale);
        observer.complete();
      });
    });
  }

  public getOnSale(
    page = 1,
    perPage = 6, refresh = false, url: string = this.url + '/GAPRODOS?page=' + page): Observable<ProduitPaginate> {
    return new Observable(observer => {
      if (!refresh && this.produitOnSale) {
        observer.next(this.produitOnSale);
        return observer.complete();
      }
      this.loadSource.next(true);
      this.http.get<ProduitPaginate>(url + '&perPage=' + perPage).subscribe(value => {
        this.produitOnSale = value;
        this.loadSource.next(false);
        observer.next(this.produitOnSale);
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DPROD/' + id);
  }

  deleteImage(image: Image): Observable<any> {
    return this.http.delete<any>(this.url + '/DIPROD/' + image.id + '/' + image.name);
  }

  save(value: Produit): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(this.url + '/SPROD', value, {headers: headers});
  }

  update(value: Produit): Observable<any> {
    return this.http.put<any>(this.url + '/UPROD', value);
  }

}
