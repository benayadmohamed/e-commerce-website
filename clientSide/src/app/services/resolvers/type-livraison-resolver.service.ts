import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VilleService} from '../ville.service';
import {map} from 'rxjs/operators';
import {TypeLivraisonService} from '../type-livraison.service';

@Injectable({
  providedIn: 'root'
})
export class TypeLivraisonResolverService implements Resolve<boolean> {

  constructor(private typeLivraisonService: TypeLivraisonService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.typeLivraisonService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
