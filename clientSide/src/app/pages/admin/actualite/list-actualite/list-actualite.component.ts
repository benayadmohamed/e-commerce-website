import {Component, OnInit} from '@angular/core';
import {Actualite} from '../../../../models/actualite';
import {ActualitePaginate} from '../../../../models/actualite-paginate';
import {ActualiteService} from '../../../../services/actualite.service';
import {AppComponent} from '../../../../app.component';
import {SnotifyService} from 'ng-snotify';
import {TokenService} from '../../../../services/token.service';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-list-actualite',
  templateUrl: './list-actualite.component.html',
  styleUrls: ['./list-actualite.component.css']
})
export class ListActualiteComponent implements OnInit {

  displayedColumns: string[] = ['image', 'Titre', 'subtitle', 'active', 'actionsColumn'];
  actualites: Actualite[] = [];
  actualitePaginate: ActualitePaginate = new ActualitePaginate();
  url: string = environment.urlServeur2;

  constructor(
    private actualiteService: ActualiteService,
    private notify: SnotifyService,
    private errorsNotifService: ErrorsNotifService,
    public appComponent: AppComponent,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.actualiteService.actualitePaginates.subscribe(value => {
      this.actualites = value.data;
      this.actualitePaginate = value;
    });
  }

  delete(id: number) {
    console.log(id);
    this.notify.confirm('Sure to delete?', {
      position: 'rightTop',
      timeout: 0,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes', action: () => {
            this.actualiteService.delete(id).subscribe(value => {
              console.log(value);
              this.actualiteService.removeActualitePaginate(id);
              this.actualiteService.removeActualite(id);
              this.errorsNotifService.handleResponse('Success');
            }, error1 => {
              this.errorsNotifService.handleErreur('Erreur');
              console.log(error1);
            });
          }, bold: false
        },
        {text: 'No', action: () => this.notify.clear()},
      ]
    });
  }

  change(paginator) {

    this.appComponent.load = true;
    this.actualiteService.getAll('', true, paginator.pageIndex + 1, paginator.pageSize).subscribe(value => {
      this.appComponent.load = false;
    });

  }

  search(data) {
    this.actualiteService.getAll(data, true).subscribe(value => {
    });
  }
}
