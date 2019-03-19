import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProduitService} from '../produit.service';
import {Produit} from '../../models/produit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitResolverService implements Resolve<Produit> {

  constructor(private serviceProduit: ProduitService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produit> | Promise<Produit> | Produit {
    const id = route.paramMap.get('id');
    return this.serviceProduit.getById(parseFloat(id)).pipe(map(value => {
      if (value) {
        return value;
      } else {
        this.router.navigate(['/main/produits']);
        return null;
      }
    }));
  }
}
