import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TypeLivraisonService} from '../type-livraison.service';
import {map} from 'rxjs/operators';
import {TarifService} from '../tarif.service';
import {VilleService} from '../ville.service';

@Injectable({
  providedIn: 'root'
})
export class TarifResolverService implements Resolve<number> {

  constructor(private typeLivraisonService: TypeLivraisonService,
              private tarifService: TarifService,
              private villeService: VilleService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return this.typeLivraisonService.get().pipe(map(value => {
      if (value.length) {
        this.villeService.get().subscribe(value3 => {
        });
        this.tarifService.get(value[0].id, true).subscribe(value1 => {
        });
        return value[0].id;
      } else {
        this.router.navigate(['/main/admin/typeLivraison2']);
        return null;
      }
    }));
  }
}
