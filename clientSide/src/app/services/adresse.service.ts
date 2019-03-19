import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {Adresse} from '../models/adresse';
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private url = environment.urlServeur;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.url + '/GA');
  }

  public getAPer(): Observable<Adresse> {
    return this.http.get<Adresse>(this.url + '/GAPer');
  }

  public getAPro(): Observable<Adresse> {
    return this.http.get<Adresse>(this.url + '/GAPro');
  }

  update(value: Adresse): Observable<any> {
    return this.http.put<any>(this.url + '/UA', value);
  }
}
