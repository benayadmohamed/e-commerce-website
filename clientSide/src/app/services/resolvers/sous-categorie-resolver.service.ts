import {Injectable} from '@angular/core';
import {CategorieService} from '../categorie.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SousCategorieService} from '../sous-categorie.service';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieResolverService implements Resolve<boolean> {

  constructor(private sousCategorieService: SousCategorieService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean> | boolean {
    return this.sousCategorieService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/Error']);
        return false;
      }
    }));
  }
}
