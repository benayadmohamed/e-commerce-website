import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ProduitService} from '../produit.service';
import {map} from 'rxjs/operators';
import {TokenService} from '../token.service';
import {WishlistService} from '../wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsWishlistResolverService implements Resolve<ProduitPaginate> {

  constructor(private serviceProduit: ProduitService,
              private router: Router,
              private tokenService: TokenService,
              private wishlistService: WishlistService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProduitPaginate>
    | Promise<ProduitPaginate> | ProduitPaginate {
    if (this.tokenService.loggedIn()) {
      return this.wishlistService.get(this.wishlistService.wishListIsModified).pipe(map(value => {
        if (value) {
          this.wishlistService.wishListIsModified = false;
          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    } else {
      return this.wishlistService.getByListId(
        this.wishlistService.wishListIsModified,
        1,
        12,
        this.wishlistService.getWishlist()
      ).pipe(map(value => {
        if (value) {
          this.wishlistService.wishListIsModified = false;
          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    }
  }
}
