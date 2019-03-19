import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-menu-admin',
    templateUrl: './menu-admin.component.html',
    styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
        .pipe(
            map(result => result.matches)
        );

    constructor(private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
    }

}
