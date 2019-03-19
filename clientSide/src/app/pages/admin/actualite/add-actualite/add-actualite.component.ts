import {Component, OnInit} from '@angular/core';
import {Actualite} from '../../../../models/actualite';
import {FormControl, Validators} from '@angular/forms';
import {ModelErrors} from '../../../../models/model-errors';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {Observable} from 'rxjs';
import {Image} from '../../../../models/image';
import {ActualiteService} from '../../../../services/actualite.service';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-add-actualite',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.css']
})
export class AddActualiteComponent extends ModelErrors implements OnInit {
  actualite: Actualite = new Actualite();
  nbFile = 0;

  constructor(private actualiteService: ActualiteService,
              private notify: SnotifyService,
              private errorsNotifService: ErrorsNotifService,
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
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
      this.actualiteService.save(this.actualite).subscribe(value => {
        if (value.data.active) {
          this.actualiteService.addActualite(value.data);
          this.actualiteService.addActualitePaginate(value.data);
        } else {
          this.actualiteService.addActualitePaginate(value.data);
        }
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        // this.produitService.get(true);
        this.actualite = new Actualite();
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
