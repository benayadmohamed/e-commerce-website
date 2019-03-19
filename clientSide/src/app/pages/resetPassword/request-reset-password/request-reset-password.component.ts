import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserServicesService} from '../../../services/user-services.service';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {ErrorsMessagesService} from '../../../services/errors-messages.service';
import {ModelErrors} from '../../../models/model-errors';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent extends ModelErrors implements OnInit {
  public myuser: User = new User();
  response = false;
  reCaptchaKey = environment.reCaptchaKey;


  constructor(
    private userService: UserServicesService,
    private router: Router,
    private notify: SnotifyService,
    erreursMessagesService: ErrorsMessagesService
  ) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }


  onSubmit(captchaResponse: string) {
    this.myuser.captcha = captchaResponse;
    this.notify.info('wait...', {'timeout': 0, position: 'rightTop'});
    this.userService.sendRestPasswordLink(this.myuser).subscribe(next => {
      this.handleResponse();
    }, erreur => {
      this.handleErreur(erreur);
    });
  }

  private handleResponse() {
    this.notify.clear();
    this.notify.success('Check your email !', 'Send', {position: 'rightTop'});
    this.router.navigateByUrl('/main/login');
  }

  private handleErreur(erreur) {
    this.notify.clear();
    this.notify.error('Email not found !', 'Error', {position: 'rightTop'});
    // this.erreur = erreur.error.error;
  }
}
