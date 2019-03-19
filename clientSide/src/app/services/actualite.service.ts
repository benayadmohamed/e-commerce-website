import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActualitePaginate} from '../models/actualite-paginate';
import {Actualite} from '../models/actualite';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  private url = environment.urlServeur;
  private actualiesSource = new BehaviorSubject<Actualite[]>(null);
  actualies = this.actualiesSource.asObservable();
  private ActualitePaginateSource = new BehaviorSubject<ActualitePaginate>(null);
  actualitePaginates = this.ActualitePaginateSource.asObservable();

  setActualitePaginate(data: ActualitePaginate) {
    this.ActualitePaginateSource.next(data);
  }

  addActualitePaginate(data: Actualite) {
    if (this.ActualitePaginateSource.getValue()) {
      const acts = this.ActualitePaginateSource.getValue();
      acts.data.push(data);
      this.ActualitePaginateSource.next(acts);
    }
  }

  removeActualitePaginate(id: number) {
    if (this.ActualitePaginateSource.getValue()) {
      const acts = this.ActualitePaginateSource.getValue();
      acts.data = acts.data.filter(value1 => value1.id !== id);
      this.ActualitePaginateSource.next(acts);
    }
  }

  setActualies(data: Actualite[]) {
    this.actualiesSource.next(data);
  }

  removeActualite(id: number) {
    if (this.actualiesSource.getValue()) {
      const acts = this.actualiesSource.getValue().filter(value2 => value2.id !== id);
      this.actualiesSource.next(acts);
    }
  }

  addActualite(data: Actualite) {
    if (this.actualiesSource.getValue()) {
      const acts = this.actualiesSource.getValue();
      acts.push(data);
      this.actualiesSource.next(acts);
    }
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Actualite[]> {
    return new Observable(observer => {
      if (!refresh && this.actualiesSource.getValue()) {
        observer.next(this.actualiesSource.getValue());
        return observer.complete();
      }
      this.http.get<Actualite[]>(this.url + '/GACT').subscribe(value => {
        this.setActualies(value);
        observer.next(this.actualiesSource.getValue());
        observer.complete();
      });
    });
  }

  public getAll(filter,
                refresh: boolean = false,
                page = 1,
                perPage = 12
  ): Observable<ActualitePaginate> {
    return new Observable(observer => {
      if (!refresh && this.ActualitePaginateSource.getValue()) {
        observer.next(this.ActualitePaginateSource.getValue());
        return observer.complete();
      }
      const params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', perPage.toString())
        .set('filter', filter);
      this.http.get<ActualitePaginate>(this.url + '/GAACT', {params: params}).subscribe(value => {
        this.setActualitePaginate(value);
        observer.next(this.ActualitePaginateSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DACT/' + id);
  }

  save(value: Actualite): Observable<{ data: Actualite }> {
    return this.http.post<{ data: Actualite }>(this.url + '/SACT', value);
  }

  update(value: Actualite): Observable<{ data: Actualite }> {
    return this.http.put<{ data: Actualite }>(this.url + '/UACT', value);
  }
}
