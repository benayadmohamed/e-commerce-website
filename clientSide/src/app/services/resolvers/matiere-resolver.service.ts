import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VilleService} from '../ville.service';
import {map} from 'rxjs/operators';
import {MatiereService} from '../matiere.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereResolverService implements Resolve<boolean> {

  constructor(private matiereService: MatiereService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.matiereService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
