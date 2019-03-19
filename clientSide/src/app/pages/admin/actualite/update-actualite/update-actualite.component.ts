import {Component, OnInit} from '@angular/core';
import {ActualiteService} from '../../../../services/actualite.service';
import {Observable} from 'rxjs';
import {Actualite} from '../../../../models/actualite';
import {SnotifyService} from 'ng-snotify';
import {Image} from '../../../../models/image';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {FormControl, Validators} from '@angular/forms';
import {ModelErrors} from '../../../../models/model-errors';
import {Produit} from '../../../../models/produit';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-update-actualite',
  templateUrl: './update-actualite.component.html',
  styleUrls: ['./update-actualite.component.css']
})
export class UpdateActualiteComponent extends ModelErrors implements OnInit {
  actualite: Actualite = new Actualite();
  nbFile = 0;
  url: string = environment.urlServeur2;

  constructor(private actualiteService: ActualiteService,
              private notify: SnotifyService,
              private errorsNotifService: ErrorsNotifService,
              private route: ActivatedRoute,
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.route.data.subscribe((value: { actualite: Actualite }) => {
      this.actualite = value.actualite;
    }, error1 => {
      console.log(error1);
    });
    this.name = new FormControl('', [Validators.required]);

  }

  OnChimages(images: any) {
    console.log(images.files[0]);
    const file = images.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const Im = new Image();
      Im.name = file.name;
      Im.type = file.type;
      Im.value = reader.result.split(',')[1];
      Im.src = reader.result;
      this.actualite.image = Im;
    };

  }

  save(myform: any) {
    const successAction = Observable.create(observer => {
      this.actualiteService.update(this.actualite).subscribe(value => {
        console.log(value);
        if (value.data.active) {
          this.actualiteService.removeActualitePaginate(value.data.id);
          this.actualiteService.removeActualite(value.data.id);
          this.actualiteService.addActualite(value.data);
          this.actualiteService.addActualitePaginate(value.data);
        } else {
          this.actualiteService.removeActualitePaginate(value.data.id);
          this.actualiteService.addActualitePaginate(value.data);
        }
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        this.nbFile = 0;
        // myform.reset();
        observer.complete();
      }, error1 => {
        console.log(error1);
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

  remove(): void {
    this.actualite.image = null;
  }
}
