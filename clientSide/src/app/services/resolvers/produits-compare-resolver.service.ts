import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ProduitService} from '../produit.service';
import {map} from 'rxjs/operators';
import {TokenService} from '../token.service';
import {WishlistService} from '../wishlist.service';
import {CompareService} from '../compare.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsCompareResolverService implements Resolve<ProduitPaginate> {

  constructor(private serviceProduit: ProduitService,
              private router: Router,
              private tokenService: TokenService,
              private compareService: CompareService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProduitPaginate>
    | Promise<ProduitPaginate> | ProduitPaginate {
    if (this.tokenService.loggedIn()) {
      return this.compareService.get(this.compareService.compareIsModified).pipe(map(value => {
        if (value) {
          this.compareService.compareIsModified = false;
          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    } else {
      return this.compareService.getByListId(
        this.compareService.compareIsModified,
        1,
        12,
        this.compareService.getCompare()
      ).pipe(map(value => {
        if (value) {
          this.compareService.compareIsModified = false;
          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    }
  }
}
