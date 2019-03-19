import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ville} from '../../models/ville';
import {VilleService} from '../ville.service';

@Injectable({
  providedIn: 'root'
})
export class VilleResolverService implements Resolve<boolean> {

  constructor(private serviceVille: VilleService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.serviceVille.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
