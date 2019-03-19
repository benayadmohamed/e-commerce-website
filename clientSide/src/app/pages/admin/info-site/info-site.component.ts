import {Component, OnInit} from '@angular/core';
import {InfoSite} from '../../../models/info-site';
import {ActivatedRoute} from '@angular/router';
import {ModelErrors} from '../../../models/model-errors';
import {ErrorsMessagesService} from '../../../services/errors-messages.service';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {InfoSiteService} from '../../../services/info-site.service';
import {ErrorsNotifService} from '../../../services/errors-notif.service';
import {MouseEvent} from '@agm/core';

@Component({
  selector: 'app-info-site',
  templateUrl: './info-site.component.html',
  styleUrls: ['./info-site.component.css']
})
export class InfoSiteComponent extends ModelErrors implements OnInit {
  infoSite: InfoSite;
  x: number;
  y: number;

  constructor(private route: ActivatedRoute,
              private infoSiteService: InfoSiteService,
              private errorsNotifService: ErrorsNotifService,
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {

    this.route.data.subscribe((value: { infoSite: InfoSite }) => {
      this.infoSite = value.infoSite;
      this.x = parseFloat(this.infoSite.x);
      this.y = parseFloat(this.infoSite.y);
      console.log(value);
    }, error1 => {
      console.log(error1);
    });
    this.name = new FormControl('', [Validators.required]);
    this.region = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.lName = new FormControl('', [Validators.required]);
    this.fName = new FormControl('', [Validators.required]);
  }

  save() {

    const successAction = Observable.create(observer => {
      this.infoSiteService.update(this.infoSite).subscribe(value => {
        this.infoSiteService.get(true).subscribe(value1 => {
          this.infoSite = value1;
        });
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        observer.complete();
      }, error1 => {
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

  markerDragEnd($event: MouseEvent) {
    this.infoSite.x = $event.coords.lat.toString();
    this.infoSite.y = $event.coords.lng.toString();
    console.log('dragEnd', $event);
  }
}
