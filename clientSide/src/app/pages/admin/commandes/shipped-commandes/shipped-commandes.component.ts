import {Component, Input, OnInit} from '@angular/core';
import {Adresse} from '../../../../models/adresse';
import {Commande} from '../../../../models/commande';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {SnotifyService} from 'ng-snotify';
import {AppComponent} from '../../../../app.component';
import {Observable} from 'rxjs';
import {CommandeAdminService} from '../../../../services/commande-admin.service';
import {CommandePaginate} from '../../../../models/commande-paginate';
import {Sort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-shipped-commandes',
  templateUrl: './shipped-commandes.component.html',
  styleUrls: ['./shipped-commandes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShippedCommandesComponent implements OnInit {


  displayedColumns: string[] = ['Client', 'Date', 'Statut', 'TypePaiement', 'TypeLivraison', 'Totale', 'actionsColumn'];
  commandes = [];
  commandePaginate: CommandePaginate = new CommandePaginate();
  commande: Commande;
  public editCache = {};
  url: string = environment.urlServeur2;
  @Input() loggedInAdmin: boolean;

  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(
    private notify: SnotifyService,
    private errorsNotifService: ErrorsNotifService,
    private commandeAdminService: CommandeAdminService) {
  }

  ngOnInit() {
    this.commandeAdminService.commandesShipped.subscribe(value => {
      if (value) {
        this.commandes = [];
        value.data.forEach(element => this.commandes.push(element, {detailRow: true, element}));
        value.filterValue = this.commandePaginate.filterValue;
        value.sortDir = this.commandePaginate.sortDir;
        value.sortAct = this.commandePaginate.sortAct;
        this.commandePaginate = value;
      }
    });
  }

  getFLName(ele: Adresse[]) {
    const add = ele.find(value => value.type === 'pro');
    return add.LName + ' ' + add.FName;
  }

  change(paginator) {

    this.commandeAdminService.getShipped(
      this.commandePaginate.filterValue,
      this.commandePaginate.sortDir,
      this.commandePaginate.sortAct,
      true,
      paginator.pageIndex + 1,
      paginator.pageSize).subscribe(value => {
    });

  }

  applyFilter(filterValue: string) {
    this.commandePaginate.filterValue = filterValue;
    this.commandeAdminService.getShipped(
      this.commandePaginate.filterValue,
      this.commandePaginate.sortDir,
      this.commandePaginate.sortAct,
      true,
      1).subscribe(value => {
    });
  }

  sortData(sort: Sort) {
    this.commandePaginate.sortDir = sort.direction;
    this.commandePaginate.sortAct = sort.active;
    if (sort.direction) {
      this.commandeAdminService.getShipped(
        this.commandePaginate.filterValue,
        this.commandePaginate.sortDir,
        this.commandePaginate.sortAct,
        true,
        1).subscribe(value => {
      });
    }

  }

  startEdit(element: Commande) {
    this.editCache[element.id + ''] = new Commande();
    this.editCache[element.id + ''].statut = element.statut;
    element.edit = true;
  }

  saveEdit(element: Commande) {
    if (this.editCache[element.id + ''].statut === element.statut) {
      element.edit = false;
      return 0;
    }
    const successAction = Observable.create(observer => {
      this.commandeAdminService.update(element).subscribe(value => {
        element.edit = false;
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        this.commandePaginate.data = this.commandePaginate.data.filter(value1 => element.id !== value1.id);
        this.commandePaginate.total--;
        this.commandeAdminService.setCommandeShipped(this.commandePaginate);
        this.commandeAdminService.changeStatut(element);
        observer.complete();
      }, error1 => {
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);

  }

  cancelEdit(element: Commande) {
    element.statut = this.editCache[element.id + ''].statut;
    element.edit = false;
  }

  delete(id) {
    this.notify.confirm('Sure to delete?', {
      position: 'rightTop',
      timeout: 0,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes', action: () => {
            this.commandeAdminService.delete(id).subscribe(value => {
              this.commandePaginate.data = this.commandePaginate.data.filter(value1 => id !== value1.id);
              this.commandePaginate.total--;
              this.commandeAdminService.setCommandeShipped(this.commandePaginate);
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

  getAdressePro(adresse: Adresse[]): Adresse {
    return Adresse.getAdressePro(adresse);
  }
}

