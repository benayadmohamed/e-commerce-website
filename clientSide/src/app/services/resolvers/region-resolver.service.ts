import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Region} from '../../models/region';
import {RegionService} from '../region.service';

@Injectable({
  providedIn: 'root'
})
export class RegionResolverService implements Resolve<boolean> {

  constructor(private serviceRegion: RegionService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.serviceRegion.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
