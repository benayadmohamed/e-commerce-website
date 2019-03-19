import {Component, OnInit, ViewChild} from '@angular/core';
import {ProduitPaginate} from '../../models/produit-paginate';
import {Produit} from '../../models/produit';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment';
import {AppComponent} from '../../app.component';
import {ActivatedRoute} from '@angular/router';
import {ProduitService} from '../../services/produit.service';
import {LigneCommande} from '../../models/ligne-commande';
import {CompareService} from '../../services/compare.service';
import {TokenService} from '../../services/token.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Article} from '../../models/article';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  displayedColumns: string[] = ['produit', 'nom', 'prix', 'availability', 'actionsColumn'];
  public dataSource: Produit[] = [];
  produitPaginate: ProduitPaginate;
  url: string = environment.urlServeur2;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    public tokenService: TokenService,
    private socket: Socket,
    private shoppingCartService: ShoppingCartService,
    private compareService: CompareService
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
      this.compareService.setproduitPaginator(this.produitPaginate);

    });
    this.compareService.produitPaginator.subscribe(value => {
      this.produitPaginate = value;
      this.dataSource = value.data;
    });
  }

  deleteAll() {
    this.compareService.clearCompare();
    // this.dataSource.data = [];
  }

  delete(id) {
    this.compareService.removeItemFromCompare(id);
  }

  change(paginator) {

    this.appComponent.load = true;
    if (this.tokenService.loggedIn()) {
      this.compareService.get(true).subscribe(value => {
        // this.compareService.setproduitPaginator(value);
        this.appComponent.load = false;
      });
    } else {
      this.compareService.getByListId(
        true,
        paginator.pageIndex + 1,
        paginator.pageSize,
        this.compareService.getCompare()).subscribe(value => {
        // this.compareService.setproduitPaginator(value);
        this.appComponent.load = false;
      });
    }
  }

  selectColor(ele: Produit, color) {
    if (!ele.ligneCommande) {
      ele.ligneCommande = new LigneCommande();
    }
    // ele.ligneCommande.color = color;
  }

  addToShoppingCart(pro: Produit) {
    const LC = new LigneCommande();
    LC.quantite = 1;
    LC.produit_id = pro.id;
    LC.produit = pro;
    this.shoppingCartService.addShoppingCart(LC);
  }
}
