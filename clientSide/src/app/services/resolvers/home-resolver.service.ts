import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ActualiteService} from '../actualite.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<boolean> {

  constructor(private actualiteService: ActualiteService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(subscriber => {
      this.actualiteService.get().subscribe(value => {
        subscriber.next(true);
        subscriber.complete();
      }, error1 => {
        subscriber.error(false);
      });
    });
  }
}
