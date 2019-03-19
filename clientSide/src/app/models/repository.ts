import {Observable} from 'rxjs';

export interface Repository<T> {
    get(): Observable<T[]>;

    update(value: T): Observable<any>;

    save(value: T): Observable<any>;

    delete(id: number): Observable<any>;

}
