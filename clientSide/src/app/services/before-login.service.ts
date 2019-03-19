import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

    constructor(private Token: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return !this.Token.loggedIn();
    }
}
