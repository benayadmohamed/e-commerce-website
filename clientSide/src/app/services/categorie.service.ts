import {Injectable} from '@angular/core';
import {Repository} from '../models/repository';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Categorie} from '../models/categorie';
import {Region} from '../models/region';
import {ProduitPaginate} from '../models/produit-paginate';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private url = environment.urlServeur;

  private categoriesSource = new BehaviorSubject<Categorie[]>(null);
  categories = this.categoriesSource.asObservable();

  setCategories(data: Categorie[]) {
    this.categoriesSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Categorie[]> {
    return new Observable(observer => {
      if (!refresh && this.categoriesSource.getValue()) {
        observer.next(this.categoriesSource.getValue());
        return observer.complete();
      }
      this.http.get<Categorie[]>(this.url + '/GACAT').subscribe(value => {
        this.categoriesSource.next(value);
        observer.next(this.categoriesSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DCAT/' + id);
  }

  save(value: Categorie): Observable<any> {
    return this.http.post<any>(this.url + '/SCAT', value);
  }

  update(value: Categorie): Observable<any> {
    return this.http.put<any>(this.url + '/UCAT', value);
  }
}
