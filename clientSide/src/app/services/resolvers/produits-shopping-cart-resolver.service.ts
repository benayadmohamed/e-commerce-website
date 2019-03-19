import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitService} from '../produit.service';
import {map} from 'rxjs/operators';
import {Produit} from '../../models/produit';
import {ShoppingCartService} from '../shopping-cart.service';
import {LigneCommande} from '../../models/ligne-commande';
import {TokenService} from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsShoppingCartResolverService implements Resolve<LigneCommande[]> {

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private tokenService: TokenService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LigneCommande[]>
    | Promise<LigneCommande[]> | LigneCommande[] {
    if (this.tokenService.loggedIn()) {
      return this.shoppingCartService.get(
        this.shoppingCartService.ShoppingCartIsModified
      ).pipe(map(value => {
        if (value) {
          console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH1', value);

          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    } else {
      return this.shoppingCartService.get2(
        this.shoppingCartService.ShoppingCartIsModified,
        this.shoppingCartService.getShoppingCartId()
      ).pipe(map(value => {
        if (value) {
          return value;
        } else {
          this.router.navigate(['/main/home']);
          return null;
        }
      }));
    }
  }
}
