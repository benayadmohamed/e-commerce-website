import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {UserServicesService} from '../../services/user-services.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {ErrorsMessagesService} from '../../services/errors-messages.service';
import {ModelErrors} from '../../models/model-errors';
import {Observable} from 'rxjs';
import {ErrorsNotifService} from '../../services/errors-notif.service';
import {AuthentificationService} from '../../services/authentification.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent extends ModelErrors implements OnInit {
  public myuser: User = new User();
  submitted = false;
  hide = null;
  erreur = [];
  reCaptchaKey = environment.reCaptchaKey;


  constructor(private userService: UserServicesService,
              private tokenService: TokenService,
              private route: Router,
              private authService: AuthentificationService,
              erreursMessagesService: ErrorsMessagesService,
              private errorsNotifService: ErrorsNotifService,) {
    super(erreursMessagesService);
  }


  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.password_confirmation = new FormControl('', [this.confirmationValidator]);
  }

  onSubmit(captchaResponse: string) {
    this.myuser.captcha = captchaResponse;
    const successAction = Observable.create(observer => {
      this.userService.signup(this.myuser).subscribe(data => {
        this.handleResponse(data);
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
      }, erreur => {
        this.handleErreur(erreur);
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

  private handleResponse(data) {
    this.tokenService.handle(data);
    this.authService.changeAuthStatus(true);
    this.route.navigateByUrl('/main/accountSettingsComponent');
  }

  private handleErreur(erreur) {
    this.erreur = erreur.error.errors;
  }
}
