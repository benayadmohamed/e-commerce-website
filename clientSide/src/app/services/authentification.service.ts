import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  private loggedInAdmin = new BehaviorSubject<boolean>(this.Token.loggedInAdmin());

  authAdminStatus = this.loggedInAdmin.asObservable();
  authStatus = this.loggedIn.asObservable();


  changeAuthStatus(b: boolean) {
    if (b) {
      this.loggedIn.next(b);
      if (this.Token.getRole() === 'admin') {
        this.loggedInAdmin.next(b);
      }
    } else {
      this.loggedIn.next(b);
      this.loggedInAdmin.next(b);
    }
  }

  constructor(private Token: TokenService) {
  }
}
