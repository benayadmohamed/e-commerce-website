import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Repository} from '../models/repository';
import {Color} from '../models/color';
import {Matiere} from '../models/matiere';
import {Ville} from '../models/ville';

@Injectable({
  providedIn: 'root'
})
export class ColorService implements Repository<Color> {

  private url = environment.urlServeur;
  colorsSource = new BehaviorSubject<Color[]>(null);
  colors = this.colorsSource.asObservable();

  setColors(data: Color[]) {
    this.colorsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Color[]> {
    return new Observable(observer => {
      if (!refresh && this.colorsSource.getValue()) {
        observer.next(this.colorsSource.getValue());
        return observer.complete();
      }
      this.http.get<Color[]>(this.url + '/GACOL').subscribe(value => {
        this.setColors(value);
        observer.next(this.colorsSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DCOL/' + id);
  }

  save(value: Color): Observable<any> {
    return this.http.post<any>(this.url + '/SCOL', value);
  }

  update(value: Color): Observable<any> {
    return this.http.put<any>(this.url + '/UCOL', value);
  }
}
