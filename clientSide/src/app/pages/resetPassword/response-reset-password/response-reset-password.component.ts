import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserServicesService} from '../../../services/user-services.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {ErrorsMessagesService} from '../../../services/errors-messages.service';
import {ModelErrors} from '../../../models/model-errors';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent extends ModelErrors implements OnInit {

  public myuser: User = new User();
  reCaptchaKey = environment.reCaptchaKey;


  constructor(
    private userService: UserServicesService,
    private route: ActivatedRoute,
    private router: Router,
    erreursMessagesService: ErrorsMessagesService
  ) {
    super(erreursMessagesService);
    this.route.queryParams.subscribe(params => {
      this.myuser.token = params['token'];
    });
  }

  ngOnInit() {
    this.password = new FormControl('', [Validators.required]);
    this.password_confirmation = new FormControl('', [this.confirmationValidator]);
  }


  onSubmit(captchaResponse: string) {
    this.myuser.captcha = captchaResponse;
    this.userService.changePassword(this.myuser).subscribe(next => {
      console.log(next);
      this.handleResponse();
    }, erreur => {
      this.handleErreur(erreur);
    });
  }

  private handleResponse() {
    this.router.navigateByUrl('/main/login');
  }

  private handleErreur(erreur) {
    // this.erreur = erreur.error.error;
  }


}
