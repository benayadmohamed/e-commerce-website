import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Region} from '../models/region';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {DataService} from './data.service';
import {CompareService} from './compare.service';
import {WishlistService} from './wishlist.service';
import {AuthentificationService} from './authentification.service';
import {Router} from '@angular/router';
import {ShoppingCartService} from './shopping-cart.service';
import {LigneCommande} from '../models/ligne-commande';
import {CommandeAdminService} from './commande-admin.service';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private url = environment.urlServeur;

  constructor(private http: HttpClient,
              private wishlistService: WishlistService,
              private shoppingCartService: ShoppingCartService,
              private dataService: DataService,
              private compareService: CompareService,
              private commandeAdminService: CommandeAdminService,
              private route: Router,
              private authService: AuthentificationService,
              private tokenService: TokenService) {
  }

  private userSource = new BehaviorSubject<User>(null);
  user = this.userSource.asObservable();

  setUserSource(data: User) {
    this.userSource.next(data);
  }

  public get(refresh = false): Observable<User> {
    return new Observable(observer => {
      if (!refresh && this.userSource.getValue()) {
        observer.next(this.userSource.getValue());
        return observer.complete();
      }
      this.http.get<User>(this.url + '/me').subscribe(value => {
        this.setUserSource(value);
        observer.next(this.userSource.getValue());
        observer.complete();
      });
    });
  }

  public login(myuser: User): Observable<Object> {
    return this.http.post(this.url + '/login', myuser);
  }

  public loginWithGoogle(token: string): Observable<Object> {
    return this.http.post(this.url + '/loginWithGoogle', {token: token});
  }

  public loginWithFacebook(token: string): Observable<Object> {
    return this.http.post(this.url + '/loginWithFacebook', {token: token});
  }

  public logout(): Observable<Object> {
    return this.http.post(this.url + '/logout', null);
  }

  public signup(myuser: User): Observable<Object> {
    return this.http.post(this.url + '/signup', myuser);
  }

  public sendRestPasswordLink(myuser: User) {
    return this.http.post(this.url + '/sendRestPasswordLink', myuser);
    /* const req = new HttpRequest('post', this.url + '/sendRestPasswordLink', {reportProgress: true, email: myuser.email});
     return this.http.request(req);*/
  }

  public changePassword(user: User) {
    return this.http.post(this.url + '/resetPassword', user);
  }

  public handleResponse(data, url) {
    this.tokenService.handle(data);
    this.authService.changeAuthStatus(true);
    this.shoppingCartService.syncFromLocaleToDatabase();
    this.wishlistService.syncFromLocaleToDatabase().subscribe(value => {
      this.wishlistService.get(true).subscribe(value2 => {
      });
    });
    this.compareService.syncFromLocaleToDatabase().subscribe(value => {
      this.compareService.get(true).subscribe(value2 => {
      });
    });
    this.route.navigateByUrl(url);
  }

  public logout2() {
    this.logout().subscribe(next => {
      this.tokenService.remove();
      this.tokenService.delRole();
      this.authService.changeAuthStatus(false);
      this.route.navigateByUrl('/');
      this.wishlistService.setproduitPaginator(null);
      this.compareService.setproduitPaginator(null);
      this.shoppingCartService.setproduitPaginator([]);
      this.dataService.setWishlist(0);
      this.dataService.setShoppingCart(0);
      this.dataService.setCompares(0);
      this.setUserSource(null);
      this.commandeAdminService.setCommandeDelivered(null);
      this.commandeAdminService.setCommandeShipped(null);
      this.commandeAdminService.setCommandeNews(null);
      this.commandeAdminService.setCommandeClosed(null);
    }, error1 => {
      if (error1.error.message === 'Unauthenticated  :(.') {
        this.tokenService.remove();
        this.authService.changeAuthStatus(false);
        this.route.navigateByUrl('/');
      }
    });
  }
}
