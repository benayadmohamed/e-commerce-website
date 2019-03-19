import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProfileService} from '../../../services/profile.service';
import {User} from '../../../models/user';
import {AuthentificationService} from '../../../services/authentification.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private profileService: ProfileService,
              private authService: AuthentificationService) {
  }

  loggedInAdmin: boolean;

  ngOnInit(): void {
    this.authService.authAdminStatus.subscribe(next => {
      this.loggedInAdmin = next;
    });
  }

}
