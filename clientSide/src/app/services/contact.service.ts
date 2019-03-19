import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = environment.urlServeur;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }


  public sendContact(contact: Contact): Observable<any> {
    return this.http.post(this.url + '/SC', contact);
  }
}
