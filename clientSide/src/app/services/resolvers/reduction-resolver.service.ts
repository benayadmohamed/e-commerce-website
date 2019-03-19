import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ColorService} from '../color.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReductionService} from '../reduction.service';

@Injectable({
  providedIn: 'root'
})
export class ReductionResolverService implements Resolve<boolean> {

  constructor(private reductionService: ReductionService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.reductionService.get().pipe(map(value => {
      if (value) {
        return true;
      } else {
        this.router.navigate(['/main/home']);
        return false;
      }
    }));
  }
}
