import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VilleService} from '../ville.service';
import {map} from 'rxjs/operators';
import {ColorService} from '../color.service';

@Injectable({
  providedIn: 'root'
})
export class ColorResolverService implements Resolve<boolean> {

  constructor(private colorService: ColorService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.colorService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
