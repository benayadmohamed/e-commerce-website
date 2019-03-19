import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategorieService} from '../categorie.service';
import {map} from 'rxjs/operators';
import {UserServicesService} from '../user-services.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingResolverService implements Resolve<boolean> {

  constructor(private userServicesService: UserServicesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    | Promise<boolean> | boolean {
    return this.userServicesService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/Error']);
        return false;
      }
    }));
  }
}
