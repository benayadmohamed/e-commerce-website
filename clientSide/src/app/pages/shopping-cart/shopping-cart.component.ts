import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ActivatedRoute, Router} from '@angular/router';
import {LigneCommande} from '../../models/ligne-commande';
import {Produit} from '../../models/produit';
import {ProduitService} from '../../services/produit.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {environment} from '../../../environments/environment';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {AuthentificationService} from '../../services/authentification.service';
import {Commande} from '../../models/commande';
import {Statuts} from '../../models/statuts.enum';
import {CheckoutService} from '../../services/checkout.service';
import {Article} from '../../models/article';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['produit', 'nom', 'prix', 'Quantite', 'subTotal', 'actionsColumn'];
  public dataSource = new MatTableDataSource<LigneCommande>([]);
  url: string = environment.urlServeur2;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  login = false;
  commande: Commande = new Commande();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socket: Socket,
    public appComponent: AppComponent,
    private produitService: ProduitService,
    private checkoutService: CheckoutService,
    private authentificationService: AuthentificationService,
    private shoppingCartService: ShoppingCartService) {
  }


  ngOnInit() {
    this.socket
      .fromEvent<any>('quantiteSetNotification')
      .map(data => data).subscribe(value => {
      let articles: Article[] = [];
      articles = [...JSON.parse(value)];

      articles.forEach(value0 => {
        const tmp = this.dataSource.data.find(value1 => value1.produit.article.id === value0.id);
        if (tmp) {
          tmp.produit.article.stock = value0.stock;
        }
      });
      this.shoppingCartService.setproduitPaginator(this.dataSource.data);

    });
    this.shoppingCartService.produitPaginator.subscribe(value => {
      this.dataSource.data = value;
    });
    this.authentificationService.authStatus.subscribe(value => this.login = value);
  }

  deleteAll() {
    this.shoppingCartService.clearShoppingCart();
  }

  delete(LC: LigneCommande) {
    this.shoppingCartService.removeItemFromShoppingCart(LC);
  }

  removeQu(ele: LigneCommande) {
    if (ele.quantite > 1) {
      ele.quantite--;
      this.shoppingCartService.removeQuantitetShoppingCart(ele);
    }
  }


  addQu(ele: LigneCommande) {
    if (ele.quantite < ele.produit.article.stock) {
      ele.quantite++;
      this.shoppingCartService.addQuantitetShoppingCart(ele);
    }
  }

  getTotale(): number {
    this.commande.total = this.dataSource.data
      .map(value => (!value.produit.reduction) ?
        value.produit.prix * value.quantite :
        (value.produit.prix - value.produit.prix * (value.produit.reduction.valeurPourcentage / 100)) * value.quantite)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    return this.commande.total;
  }

  getTVA(): number {
    return this.dataSource.data
      .map(value => (value.produit.tva) ? value.produit.tva * value.quantite : 0)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  calcSubTotal(element: LigneCommande) {
    element.sousTotal = element.produit.prix * element.quantite;
    return element.sousTotal;
  }

  calcSubTotalWithReduction(element: LigneCommande) {
    element.sousTotal = (element.produit.prix - element.produit.prix *
      (element.produit.reduction.valeurPourcentage / 100)) * element.quantite;
    return element.sousTotal;
  }

  getLigneCommandes(): LigneCommande[] {

    return this.dataSource.data.map(value => {
      const ele = new LigneCommande();
      ele.id = value.id;
      ele.quantite = value.quantite;
      ele.sousTotal = value.sousTotal;
      ele.produit_id = value.produit_id;
      if (value.produit.article.stock <= 0) {
        ele.quantite = 0;
      }
      return ele;
    });
  }

  checkOut() {
    this.commande.ligneCommandes = this.getLigneCommandes();
    this.checkoutService.setCommande(this.commande);
    this.router.navigate(['/main/checkout']);
  }
}
