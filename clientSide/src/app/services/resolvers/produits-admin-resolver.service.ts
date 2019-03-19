import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitPaginate} from '../../models/produit-paginate';
import {map} from 'rxjs/operators';
import {ProduitService} from '../produit.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsAdminResolverService implements Resolve<boolean> {

  constructor(private serviceProduit: ProduitService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean> | boolean {
    return this.serviceProduit.getByName('').pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
