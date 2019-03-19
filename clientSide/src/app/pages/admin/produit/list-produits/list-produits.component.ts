import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {ProduitService} from '../../../../services/produit.service';
import {ProduitPaginate} from '../../../../models/produit-paginate';
import {MatTableDataSource} from '@angular/material';
import {Produit} from '../../../../models/produit';
import {TokenService} from '../../../../services/token.service';
import {AppComponent} from '../../../../app.component';
import {environment} from '../../../../../environments/environment';
import {Article} from '../../../../models/article';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css']
})
export class ListProduitsComponent implements OnInit {
  displayedColumns: string[] = ['produit', 'nom', 'prix', 'Quantite', 'actionsColumn'];
  produits: Produit[] = [];
  produitPaginate: ProduitPaginate = new ProduitPaginate();
  url: string = environment.urlServeur2;

  constructor(
    private serviceProduit: ProduitService,
    private notify: SnotifyService,
    private socket: Socket,
    private errorsNotifService: ErrorsNotifService,
    public appComponent: AppComponent,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.socket
      .fromEvent<any>('quantiteSetNotification')
      .map(data => data).subscribe(value => {
      let articles: Article[] = [];
      articles = [...JSON.parse(value)];
      console.log(articles);
      console.log(this.produitPaginate);
      articles.forEach(value0 => {
        const tmp = this.produitPaginate.data.find(value1 => value1.article.id === value0.id);
        if (tmp) {
          tmp.article.stock = value0.stock;
        }
      });
      this.serviceProduit.setproduitPaginatorAdmin(this.produitPaginate);

    });
    this.serviceProduit.produitPaginatorAdmin.subscribe(value => {
      this.produits = value.data;
      this.produitPaginate = value;
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
            this.serviceProduit.delete(id).subscribe(value => {
              console.log(value);
              this.serviceProduit.getByName('', true).subscribe(value2 => {
                this.errorsNotifService.handleResponse('Success');
              });
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
    this.serviceProduit.getByName('', true, paginator.pageIndex + 1, paginator.pageSize).subscribe(value => {
      this.appComponent.load = false;
    });

  }

  search(data) {
    this.serviceProduit.getByName(data, true).subscribe(value => {
    });
  }
}
