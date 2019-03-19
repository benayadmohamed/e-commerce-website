import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {Ville} from '../models/ville';
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private url = environment.urlServeur;
  private villesSource = new BehaviorSubject<Ville[]>(null);
  villes = this.villesSource.asObservable();

  setVilles(data: Ville[]) {
    this.villesSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Ville[]> {
    return new Observable(observer => {
      if (!refresh && this.villesSource.getValue()) {
        observer.next(this.villesSource.getValue());
        return observer.complete();
      }
      this.http.get<Ville[]>(this.url + '/GAV').subscribe(value => {
        this.setVilles(value);
        observer.next(this.villesSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DV/' + id);
  }

  save(value: Ville): Observable<any> {
    return this.http.post<any>(this.url + '/SV', value);
  }

  update(value: Ville): Observable<any> {
    return this.http.put<any>(this.url + '/UV', value);
  }
}
