import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ville} from '../models/ville';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {TypeLivraison} from '../models/type-livraison';

@Injectable({
  providedIn: 'root'
})
export class TypeLivraisonService {


  private url = environment.urlServeur;
  private typeLivraisonsSource = new BehaviorSubject<TypeLivraison[]>(null);
  typeLivraisons = this.typeLivraisonsSource.asObservable();

  setTypeLivraisons(data: TypeLivraison[]) {
    this.typeLivraisonsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<TypeLivraison[]> {
    return new Observable(observer => {
      if (!refresh && this.typeLivraisonsSource.getValue()) {
        observer.next(this.typeLivraisonsSource.getValue());
        return observer.complete();
      }
      this.http.get<TypeLivraison[]>(this.url + '/GATL').subscribe(value => {
        this.setTypeLivraisons(value);
        observer.next(this.typeLivraisonsSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DTL/' + id);
  }

  save(value: TypeLivraison): Observable<any> {
    return this.http.post<any>(this.url + '/STL', value);
  }

  update(value: TypeLivraison): Observable<any> {
    return this.http.put<any>(this.url + '/UTL', value);
  }
}
