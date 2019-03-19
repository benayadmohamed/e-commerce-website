import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Region} from '../models/region';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {Profile} from '../models/profile';
import {User} from '../models/user';
import {Adresse} from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = environment.urlServeur;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(): Observable<User> {
    return this.http.get<User>(this.url + '/GP');
  }


  update(value: User): Observable<any> {
    return this.http.put<any>(this.url + '/UP', value);
  }

  changePassword(value: {
    oldPassword: string, password: string,
    password_confirmation: string
  }): Observable<any> {
    return this.http.post<any>(this.url + '/CHP', value);
  }
}
