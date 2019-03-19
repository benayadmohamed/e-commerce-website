import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ProduitService} from '../produit.service';
import {EMPTY, Observable} from 'rxjs';
import {CommandeAdminService} from '../commande-admin.service';

@Injectable({
  providedIn: 'root'
})
export class CmmandeAdminResolverService implements Resolve<boolean> {

  constructor(private commandeAdminService: CommandeAdminService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean> | boolean {
    return this.commandeAdminService.getNews().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }), catchError(err => {
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
      this.router.navigate(['/main/home']);
      return EMPTY;
    }));
  }
}
