import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserServicesService} from '../../services/user-services.service';
import {TokenService} from '../../services/token.service';
import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.css']
})
export class MenuAccountComponent implements OnInit {
  @Input() public loggedIn: boolean;
  @Input() public loggedInAdmin: boolean;

  constructor(private userService: UserServicesService,
              private tokenService: TokenService,
              private route: Router,
              private authService: AuthentificationService) {
  }

  ngOnInit() {
  }

  public logout(event: MouseEvent) {
    event.preventDefault();
    this.userService.logout().subscribe(next => {
      this.tokenService.remove();
      this.authService.changeAuthStatus(false);
      this.route.navigateByUrl('/main/login');
    }, error1 => {
      if (error1.error.message === 'Unauthenticated  :(.') {
        this.tokenService.remove();
        this.authService.changeAuthStatus(false);
        this.route.navigateByUrl('/main/login');
      }
    });
  }
}
