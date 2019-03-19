import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate, CanActivateChild {

  constructor(private Token: TokenService, private router: Router, private authService: AuthentificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.Token.loggedIn()) {
      return this.Token.loggedIn();
    } else {
      this.authService.changeAuthStatus(false);
      this.router.navigate(['/main/login']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
