import {Component, OnInit} from '@angular/core';
import {Produit} from '../../../models/produit';
import {ProduitPaginate} from '../../../models/produit-paginate';
import {Commande} from '../../../models/commande';
import {CommandePaginate} from '../../../models/commande-paginate';
import {CommandeAdminService} from '../../../services/commande-admin.service';
import {Adresse} from '../../../models/adresse';
import {AppComponent} from '../../../app.component';
import {Sort} from '@angular/material';
import {Observable} from 'rxjs';
import {ErrorsNotifService} from '../../../services/errors-notif.service';
import {SnotifyService} from 'ng-snotify';
import {v} from '@angular/core/src/render3';
import {AuthentificationService} from '../../../services/authentification.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  NewCommandePaginate: CommandePaginate = new CommandePaginate();
  ShippedCommandePaginate: CommandePaginate = new CommandePaginate();
  DeliveredCommandePaginate: CommandePaginate = new CommandePaginate();
  ClosedCommandePaginate: CommandePaginate = new CommandePaginate();
  commande: Commande;
  load = false;
  public editCache = {};
  loggedInAdmin: boolean;

  constructor(
    private commandeAdminService: CommandeAdminService, private authService: AuthentificationService) {
  }

  ngOnInit() {
    this.commandeAdminService.load.subscribe(value => this.load = value);
    this.commandeAdminService.commandesDelivered.subscribe(value => {
      this.DeliveredCommandePaginate = value;
    });
    this.commandeAdminService.commandeNews.subscribe(value => {
      this.NewCommandePaginate = value;
    });
    this.commandeAdminService.commandesShipped.subscribe(value => {
      this.ShippedCommandePaginate = value;
    });
    this.commandeAdminService.commandesClosed.subscribe(value => {
      this.ClosedCommandePaginate = value;
    });
    this.authService.authAdminStatus.subscribe(next => {
      this.loggedInAdmin = next;
    });
  }

  slectTab(value) {
    switch (value) {
      case 0:
        this.commandeAdminService.getNews().subscribe(value2 => {
        });
        break;
      case 1:
        this.commandeAdminService.getShipped().subscribe(value2 => {
        });
        break;
      case 2:
        this.commandeAdminService.getDelivered().subscribe(value2 => {
        });
        break;
      case 3:
        this.commandeAdminService.getClosed().subscribe(value2 => {
        });
        break;
    }
  }

}
