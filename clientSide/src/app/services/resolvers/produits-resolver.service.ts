import {Injectable} from '@angular/core';
import {ProduitService} from '../produit.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Produit} from '../../models/produit';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ProduitPaginate} from '../../models/produit-paginate';

@Injectable({
  providedIn: 'root'
})
export class ProduitsResolverService implements Resolve<ProduitPaginate> {

  constructor(private serviceProduit: ProduitService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProduitPaginate>
    | Promise<ProduitPaginate> | ProduitPaginate {
    return this.serviceProduit.get(true, 1, 12).pipe(map(value => {
      if (value) {
        return value;
      } else {
        this.router.navigate(['/main/home']);
        return null;
      }
    }));
  }
}
