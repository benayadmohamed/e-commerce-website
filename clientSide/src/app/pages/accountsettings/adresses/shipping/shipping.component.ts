import {Component, OnInit} from '@angular/core';
import {AdresseService} from '../../../../services/adresse.service';
import {FormControl, Validators} from '@angular/forms';
import {Adresse} from '../../../../models/adresse';
import {Router} from '@angular/router';
import {Region} from '../../../../models/region';
import {VilleService} from '../../../../services/ville.service';
import {TokenService} from '../../../../services/token.service';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {Ville} from '../../../../models/ville';
import {RegionService} from '../../../../services/region.service';
import {UserServicesService} from '../../../../services/user-services.service';
import {ModelErrors} from '../../../../models/model-errors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent extends ModelErrors implements OnInit {

  adressePro: Adresse = new Adresse();
  regions: Region[];
  villes: Ville[];
  test = 1;

  constructor(private userService: UserServicesService,
              private tokenService: TokenService,
              private route: Router,
              private regionService: RegionService,
              private villeService: VilleService,
              erreursMessagesService: ErrorsMessagesService,
              private adresseService: AdresseService,
              private errorsNotifService: ErrorsNotifService) {
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
    this.villeService.villes.subscribe(value => {
      this.villes = value;
    });
    this.userService.user.subscribe(value => {
      this.adressePro = value.profile.adresses.find(value1 => value1.type === 'pro');
    });
  }

  public save() {
    const successAction = Observable.create(observer => {
      this.adresseService.update(this.adressePro).subscribe(value => {
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
