import {Component, Input, OnInit} from '@angular/core';
import {ModelErrors} from '../../../../models/model-errors';
import {Router} from '@angular/router';
import {UserServicesService} from '../../../../services/user-services.service';
import {TokenService} from '../../../../services/token.service';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {FormControl, Validators} from '@angular/forms';
import {RegionService} from '../../../../services/region.service';
import {Region} from '../../../../models/region';
import {Ville} from '../../../../models/ville';
import {VilleService} from '../../../../services/ville.service';
import {Adresse} from '../../../../models/adresse';
import {AdresseService} from '../../../../services/adresse.service';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent extends ModelErrors implements OnInit {

  adressePer: Adresse = new Adresse();
  regions: Region[];
  villes: Ville[];
  test = 1;

  constructor(private userService: UserServicesService,
              private tokenService: TokenService,
              private route: Router,
              private regionService: RegionService,
              private villeService: VilleService,
              private adresseService: AdresseService,
              private errorsNotifService: ErrorsNotifService,
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.lName = new FormControl('', [Validators.required]);
    this.fName = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);
    this.adresse = new FormControl('', [Validators.required]);
    this.ville = new FormControl('', [Validators.required]);
    this.region = new FormControl('', [Validators.required]);

    this.regionService.regions.subscribe(value => {
      this.regions = value;
    });
    this.villeService.villes.subscribe(value => this.villes = value);

    this.userService.user.subscribe(value => {
      this.adressePer = value.profile.adresses.find(value1 => value1.type === 'per');
    });
  }

  public save() {
    const successAction = Observable.create(observer => {
      this.adresseService.update(this.adressePer).subscribe(value => {
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        observer.complete();
        // this.errorsNotifService.handleResponse('Success');
      }, error1 => {
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
        // this.errorsNotifService.handleErreur('Error');
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }


}
