import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {InfoSite} from '../models/info-site';
import {SousCategorie} from '../models/sous-categorie';

@Injectable({
  providedIn: 'root'
})
export class InfoSiteService {

  private url = environment.urlServeur;
  private infoSiteSource = new BehaviorSubject<InfoSite>(null);
  infoSite = this.infoSiteSource.asObservable();

  setInfoSite(data: InfoSite) {
    this.infoSiteSource.next(data);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getInfoSite(): Promise<InfoSite> {
    const promise = this.http.get<InfoSite>(this.url + '/GInfoSite')
      .toPromise()
      .then(infoSite => {
        return infoSite;
      });

    return promise;
  }

  public get(refresh: boolean = false): Observable<InfoSite> {
    return new Observable(observer => {
      if (!refresh && this.infoSiteSource.getValue()) {
        observer.next(this.infoSiteSource.getValue());
        return observer.complete();
      }
      this.http.get<InfoSite>(this.url + '/GInfoSite').subscribe(value => {
        this.setInfoSite(value);
        observer.next(this.infoSiteSource.getValue());
        observer.complete();
      });
    });
  }

  update(value: InfoSite): Observable<any> {
    return this.http.put<any>(this.url + '/UInfoSite', value);
  }
}
