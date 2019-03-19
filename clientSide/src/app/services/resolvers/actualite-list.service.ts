import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ActualiteService} from '../actualite.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualiteListService implements Resolve<boolean> {

  constructor(private actualiteService: ActualiteService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.actualiteService.getAll('').subscribe(value => {
        subscriber.next(true);
        subscriber.complete();
      }, error1 => {
        this.router.navigate(['/main/admin/actualite']);
        subscriber.error(false);
      });
    });
  }
}
