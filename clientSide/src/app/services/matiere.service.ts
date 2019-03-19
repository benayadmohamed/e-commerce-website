import {Injectable} from '@angular/core';
import {Matiere} from '../models/matiere';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {SousCategorie} from '../models/sous-categorie';
import {Ville} from '../models/ville';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private url = environment.urlServeur;
  private matieresSource = new BehaviorSubject<Matiere[]>(null);
  matieres = this.matieresSource.asObservable();

  setMatieres(data: Matiere[]) {
    this.matieresSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Matiere[]> {
    return new Observable(observer => {
      if (!refresh && this.matieresSource.getValue()) {
        observer.next(this.matieresSource.getValue());
        return observer.complete();
      }
      this.http.get<Matiere[]>(this.url + '/GAMAT').subscribe(value => {
        this.setMatieres(value);
        observer.next(this.matieresSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DMAT/' + id);
  }

  save(value: Matiere): Observable<any> {
    return this.http.post<any>(this.url + '/SMAT', value);
  }

  update(value: Matiere): Observable<any> {
    return this.http.put<any>(this.url + '/UMAT', value);
  }
}
