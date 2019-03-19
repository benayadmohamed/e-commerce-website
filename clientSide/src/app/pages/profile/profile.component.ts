import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {logging} from 'selenium-webdriver';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        /*  this.authService.authStatus.subscribe(next => {
              this.loggedIn = next;
          });
          if (!this.loggedIn) {
              this.route.navigateByUrl('/login');
          }*/
    }

}
