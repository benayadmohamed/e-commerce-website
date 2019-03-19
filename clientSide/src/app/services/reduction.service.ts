import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reduction} from '../models/reduction';

@Injectable({
  providedIn: 'root'
})
export class ReductionService {


  private url = environment.urlServeur;
  private reductionsSource = new BehaviorSubject<Reduction[]>(null);
  reductions = this.reductionsSource.asObservable();

  setReductions(data: Reduction[]) {
    this.reductionsSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public get(refresh: boolean = false): Observable<Reduction[]> {
    return new Observable(observer => {
      if (!refresh && this.reductionsSource.getValue()) {
        observer.next(this.reductionsSource.getValue());
        return observer.complete();
      }
      this.http.get<Reduction[]>(this.url + '/GARED').subscribe(value => {
        this.setReductions(value);
        observer.next(this.reductionsSource.getValue());
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/DRED/' + id);
  }

  save(value: Reduction): Observable<any> {
    return this.http.post<any>(this.url + '/SRED', value);
  }

  update(value: Reduction): Observable<any> {
    return this.http.put<any>(this.url + '/URED', value);
  }
}
