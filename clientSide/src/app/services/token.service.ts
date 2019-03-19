import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private url = environment.urlServeur;
  private iss = {
    login: this.url + '/login',
    loginWithGoogle: this.url + '/loginWithGoogle',
    loginWithFacebook: this.url + '/loginWithFacebook',
    signup: this.url + '/signup'
  };

  constructor(private router: Router) {
  }

  public handle(data) {
    this.set(data.access_token);
    if (data.roles === null) {
      return;
    }
    this.setRole(data.roles[0]);
  }

  private setRole(role) {
    sessionStorage.setItem('role', role);
    // localStorage.setItem('role', role);
  }

  public delRole() {
    sessionStorage.removeItem('role');
    // localStorage.removeItem('role');
  }

  private set(token) {
    sessionStorage.setItem('token', token);
    // localStorage.setItem('token', token);
  }

  public get() {
    // return localStorage.getItem('token');
    return sessionStorage.getItem('token');
  }

  public getRole() {
    return sessionStorage.getItem('role');
    // return localStorage.getItem('role');
  }

  public remove() {
    sessionStorage.removeItem('token');
    // localStorage.removeItem('token');
  }

  public isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      if (!(date.valueOf() > new Date().valueOf())) {
        return false;
      }
      if (payload) {
        return (Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false);
      }
    }
    return false;
  }

  public isValidAdmin() {

    if (this.isValid() && this.getRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  public decode(payload) {
    return JSON.parse(atob(payload));
  }

  public loggedIn(): boolean {
    return this.isValid();
  }

  public loggedInAdmin(): boolean {
    return this.isValidAdmin();
  }
}
