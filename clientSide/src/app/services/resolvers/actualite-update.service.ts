import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProduitService} from '../produit.service';
import {Actualite} from '../../models/actualite';
import {ActualiteService} from '../actualite.service';

@Injectable({
  providedIn: 'root'
})
export class ActualiteUpdateService implements Resolve<Actualite> {

  constructor(private actualiteService: ActualiteService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Actualite> | Promise<Actualite> | Actualite {
    const id = route.paramMap.get('id');
    return new Observable(subscriber => {
      this.actualiteService.actualitePaginates.subscribe(value => {
        if (value) {
          const res = value.data.find(value1 => value1.id === parseFloat(id));
          subscriber.next(res);
          subscriber.complete();
        } else {
          this.router.navigate(['/main/admin/actualite']);
          subscriber.error(null);
        }
      });
    });
  }
}
