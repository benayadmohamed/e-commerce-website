import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Repository} from '../models/repository';
import {Marque} from '../models/marque';
import {Matiere} from '../models/matiere';

@Injectable({
  providedIn: 'root'
})
export class MarqueService implements Repository<Marque> {

  private url = environment.urlServeur;
  marques: Marque[] = null;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Marque[]> {
    return new Observable(observer => {
      if (!refresh && this.marques) {
        observer.next(this.marques);
        return observer.complete();
      }
      this.http.get<Marque[]>(this.url + '/GAMAR').subscribe(value => {
        this.marques = value;
        observer.next(this.marques);
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DMAR/' + id);
  }

  save(value: Marque): Observable<any> {
    return this.http.post<any>(this.url + '/SMAR', value);
  }

  update(value: Marque): Observable<any> {
    return this.http.put<any>(this.url + '/UMAR', value);
  }
}
