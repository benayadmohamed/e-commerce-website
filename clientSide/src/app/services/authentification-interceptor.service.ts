import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {AuthentificationService} from './authentification.service';
import {DataService} from './data.service';
import {UserServicesService} from './user-services.service';
import {WishlistService} from './wishlist.service';
import {CompareService} from './compare.service';
import {CommandeAdminService} from './commande-admin.service';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationInterceptorService implements HttpInterceptor {

  constructor(private route: Router,
              private token: TokenService,
              private wishlistService: WishlistService,
              private shoppingCartService: ShoppingCartService,
              private dataService: DataService,
              private compareService: CompareService,
              private commandeAdminService: CommandeAdminService,
              private userService: UserServicesService,
              private authentificationService: AuthentificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.get();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    /*avant
     getHeader(): HttpHeaders {
       if (!this.isValid()) {
         this.router.navigate(['/login']);
         return null;
       }
       return new HttpHeaders().set('Authorization', 'Bearer ' + this.get());
     }
     return this.http.delete<any>(this.url + '/DV/' + id, {headers: this.tokenService.getHeader()});
 */
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.token.remove();
          this.authentificationService.changeAuthStatus(false);
          this.token.delRole();
          this.authentificationService.changeAuthStatus(false);
          this.wishlistService.setproduitPaginator(null);
          this.compareService.setproduitPaginator(null);
          this.shoppingCartService.setproduitPaginator([]);
          this.dataService.setWishlist(0);
          this.dataService.setShoppingCart(0);
          this.dataService.setCompares(0);
          this.userService.setUserSource(null);
          this.commandeAdminService.setCommandeDelivered(null);
          this.commandeAdminService.setCommandeShipped(null);
          this.commandeAdminService.setCommandeNews(null);
          this.commandeAdminService.setCommandeClosed(null);
          this.route.navigate(['/main/login']);
        }
        if (err.status === 500) {
          console.log(err);
          this.route.navigate(['/Error']);
        }
      }
    });
  }
}
