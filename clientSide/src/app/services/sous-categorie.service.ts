import {Injectable} from '@angular/core';
import {Repository} from '../models/repository';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SousCategorie} from '../models/sous-categorie';
import {Categorie} from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService implements Repository<SousCategorie> {

  private url = environment.urlServeur;


  private sousCategoriesSource = new BehaviorSubject<SousCategorie[]>(null);
  sousCategories = this.sousCategoriesSource.asObservable();

  setSousCategories(data: SousCategorie[]) {
    this.sousCategoriesSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<SousCategorie[]> {
    return new Observable(observer => {
      if (!refresh && this.sousCategoriesSource.getValue()) {
        observer.next(this.sousCategoriesSource.getValue());
        return observer.complete();
      }
      this.http.get<SousCategorie[]>(this.url + '/GASCAT').subscribe(value => {
        this.sousCategoriesSource.next(value);
        observer.next(this.sousCategoriesSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DSCAT/' + id);
  }

  save(value: SousCategorie): Observable<any> {
    return this.http.post<any>(this.url + '/SSCAT', value);
  }

  update(value: SousCategorie): Observable<any> {
    return this.http.put<any>(this.url + '/USCAT', value);
  }
}
