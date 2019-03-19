import {Component, OnInit, ViewChild} from '@angular/core';
import {Color} from '../../models/color';
import {Produit} from '../../models/produit';
import {environment} from '../../../environments/environment';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ActivatedRoute} from '@angular/router';
import {ProduitService} from '../../services/produit.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AppComponent} from '../../app.component';
import {LigneCommande} from '../../models/ligne-commande';
import {TokenService} from '../../services/token.service';
import {WishlistService} from '../../services/wishlist.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Socket} from 'ngx-socket-io';
import {forEach} from '@angular/router/src/utils/collection';
import {Article} from '../../models/article';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  displayedColumns: string[] = ['produit', 'nom', 'prix', 'availability', 'Quantite', 'actionsColumn'];
  public dataSource = new MatTableDataSource<Produit>([]);
  produitPaginate: ProduitPaginate;
  url: string = environment.urlServeur2;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listQuantite: { [id: string]: number; } = {};

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private socket: Socket,
    private shoppingCartService: ShoppingCartService,
    public appComponent: AppComponent,
    private tokenService: TokenService) {
  }


  ngOnInit() {

    this.socket
      .fromEvent<any>('setWishlist/u1')
      .map(data => data).subscribe(value => {
      console.log('u1 : ', value);
    });
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
      this.wishlistService.setproduitPaginator(this.produitPaginate);

    });
    /* const produitPaginate = this.produitPaginate;
     this.socket.on('quantiteSetNotification', function (msg) {
       let articles: Article[] = [];
       articles = [...JSON.parse(msg)];
       console.log(articles);
       console.log(produitPaginate);
       /!* articles.forEach(value => {
          const tmp = this.produitPaginate.data.find(value1 => value1.article.id = value.id);
          if (tmp) {
            tmp.article.stock = value.stock;
          }
        });
        this.wishlistService.setproduitPaginator(this.produitPaginate);*!/
     });*/
    this.wishlistService.produitPaginator.subscribe(value => {
      this.produitPaginate = value;
      this.dataSource.data = value.data;
    });
  }

  deleteAll() {
    this.wishlistService.clearWishlist();
    // this.dataSource.data = [];
  }

  delete(id) {
    this.wishlistService.removeItemFromWishlist(id);
  }

  change(paginator) {

    this.appComponent.load = true;
    if (this.tokenService.loggedIn()) {
      this.wishlistService.get(true).subscribe(value => {
        // this.wishlistService.setproduitPaginator(value);
        this.appComponent.load = false;
      });
    } else {
      this.wishlistService.getByListId(
        true,
        paginator.pageIndex + 1,
        paginator.pageSize,
        this.wishlistService.getWishlist()).subscribe(value => {
        // this.wishlistService.setproduitPaginator(value);
        this.appComponent.load = false;
      });
    }
  }

  removeQu(ele: Produit) {
    if (!ele.ligneCommande) {
      ele.ligneCommande = new LigneCommande();
      ele.ligneCommande.quantite = 1;
    }
    if (ele.ligneCommande.quantite > 1) {
      ele.ligneCommande.quantite--;
    }
  }


  addQu(ele: Produit) {
    if (!ele.ligneCommande) {
      ele.ligneCommande = new LigneCommande();
      ele.ligneCommande.quantite = 1;
    }
    if (ele.ligneCommande.quantite < ele.article.stock) {
      ele.ligneCommande.quantite++;
    }
  }

  addToShoppingCart(pro: Produit) {
    const LC = new LigneCommande();
    if (pro.ligneCommande) {
      LC.quantite = pro.ligneCommande.quantite;
      pro.ligneCommande = null;
    } else {
      LC.quantite = 1;
    }
    LC.produit_id = pro.id;
    LC.produit = pro;
    this.shoppingCartService.addShoppingCart(LC);
    pro.ligneCommande = new LigneCommande();
    pro.ligneCommande.quantite = 0;
  }
}
