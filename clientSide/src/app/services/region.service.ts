import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Region} from '../models/region';
import {Repository} from '../models/repository';
import {TokenService} from './token.service';
import {Produit} from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class RegionService implements Repository<Region> {

  private url = environment.urlServeur;
  regionsSource = new BehaviorSubject<Region[]>(null);
  regions = this.regionsSource.asObservable();

  setRegions(data: Region[]) {
    this.regionsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Region[]> {
    return new Observable(observer => {
      if (!refresh && this.regionsSource.getValue()) {
        observer.next(this.regionsSource.getValue());
        return observer.complete();
      }
      this.http.get<Region[]>(this.url + '/GAR').subscribe(value => {
        this.setRegions(value);
        observer.next(this.regionsSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DR/' + id);
  }

  save(value: Region): Observable<any> {
    return this.http.post<any>(this.url + '/SR', value);
  }

  update(value: Region): Observable<any> {
    return this.http.put<any>(this.url + '/UR', value);
  }

}
