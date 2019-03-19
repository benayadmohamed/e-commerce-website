import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ProduitService} from '../produit.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Categorie} from '../../models/categorie';
import {CategorieService} from '../categorie.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieResolverService implements Resolve<boolean> {

  constructor(private categorieService: CategorieService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean> | boolean {
    return this.categorieService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/Error']);
        return false;
      }
    }));
  }
}
