import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  isSmallPc: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 1025px) and (max-width: 1280px)'])
    .pipe(
      map(result => result.matches)
    );
  isTablet: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 1024px)'])
    .pipe(
      map(result => result.matches)
    );
  isSmallTablet: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 481px) and (max-width: 767px)'])
    .pipe(
      map(result => result.matches)
    );
  isPhone: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 320px) and (max-width: 480px)'])
    .pipe(
      map(result => result.matches)
    );
  isLargPc: Observable<boolean> = this.breakpointObserver.observe(['(min-width: 1281px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}
