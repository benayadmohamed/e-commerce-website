import {Injectable} from '@angular/core';
import {ProduitService} from '../produit.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProduitPaginate} from '../../models/produit-paginate';
import {map} from 'rxjs/operators';
import {CritereRecherche} from '../../models/critere-recherche';

@Injectable({
  providedIn: 'root'
})
export class ProduitsCategorieResolverService implements Resolve<ProduitPaginate> {

  constructor(private serviceProduit: ProduitService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProduitPaginate>
    | Promise<ProduitPaginate> | ProduitPaginate {
    const id = route.paramMap.get('id');
    const cri = new CritereRecherche();
    cri.categorie_id = parseFloat(id);
    return this.serviceProduit.get(true, 1, 12, cri).pipe(map(value => {
      if (value) {
        return value;
      } else {
        this.router.navigate(['/main/home']);
        return null;
      }
    }));
  }
}
