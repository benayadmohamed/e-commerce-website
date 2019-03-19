import {Component, OnInit} from '@angular/core';
import {ModelErrors} from '../../models/model-errors';
import {ErrorsMessagesService} from '../../services/errors-messages.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../models/contact';
import {ContactService} from '../../services/contact.service';
import {Observable} from 'rxjs';
import {ErrorsNotifService} from '../../services/errors-notif.service';
import {MainComponent} from '../../layout/main/main.component';
import {InfoSite} from '../../models/info-site';
import {environment} from '../../../environments/environment';
import {InfoSiteService} from '../../services/info-site.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends ModelErrors implements OnInit {
  contact: Contact = new Contact();
  my = new FormGroup({});
  infoSite: InfoSite;
  reCaptchaKey = environment.reCaptchaKey;

  constructor(erreursMessagesService: ErrorsMessagesService,
              private contactService: ContactService,
              private errorsNotifService: ErrorsNotifService,
              public main: MainComponent, private infoSiteService: InfoSiteService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.infoSiteService.infoSite.subscribe(value => this.infoSite = value);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', [Validators.required]);
  }

  public send(myform: any, captchaResponse: string) {
    this.contact.captcha = captchaResponse;
    // console.log(captchaResponse);
    const successAction = Observable.create(observer => {
      this.contactService.sendContact(this.contact).subscribe(value => {
        observer.next(this.errorsNotifService.handleResponse2('', 'Thank you for your contact'));
        observer.complete();
        myform.reset();
        this.name.invalid = true;
        this.email.invalid = true;
      }, error1 => {
        console.log(error1);
        observer.error(this.errorsNotifService.handleErreur2('', 'please try later'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

}
