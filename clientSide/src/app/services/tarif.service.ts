import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TypeLivraison} from '../models/type-livraison';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {Tarif} from '../models/tarif';

@Injectable({
  providedIn: 'root'
})
export class TarifService {


  private url = environment.urlServeur;
  private tarifsSource = new BehaviorSubject<Tarif[]>(null);
  tarifs = this.tarifsSource.asObservable();

  setTarifs(data: Tarif[]) {
    this.tarifsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(id: number, refresh: boolean = false): Observable<Tarif[]> {
    return new Observable(observer => {
      if (!refresh && this.tarifsSource.getValue()) {
        observer.next(this.tarifsSource.getValue());
        return observer.complete();
      }
      this.http.get<Tarif[]>(this.url + '/GATAR/' + id).subscribe(value => {
        this.setTarifs(value);
        observer.next(this.tarifsSource.getValue());
        observer.complete();
      });
    });
  }

  public get2(id: number, v_id: number): Observable<Tarif> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('v_id', v_id.toString());
    return this.http.get<Tarif>(this.url + '/GTAR', {params: params});
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DTAR/' + id);
  }

  save(value: Tarif): Observable<any> {
    return this.http.post<any>(this.url + '/STAR', value);
  }

  update(value: Tarif): Observable<any> {
    return this.http.put<any>(this.url + '/UTAR', value);
  }
}
