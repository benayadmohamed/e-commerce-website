import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../models/categorie';
import {Color} from '../../models/color';
import {ColorService} from '../../services/color.service';
import {ProduitService} from '../../services/produit.service';
import {Produit} from '../../models/produit';
import {environment} from '../../../environments/environment';
import {MatiereService} from '../../services/matiere.service';
import {Matiere} from '../../models/matiere';
import {ActivatedRoute, Router} from '@angular/router';
import {MainNavComponent} from '../../layout/main-nav/main-nav.component';
import {SnotifyService} from 'ng-snotify';
import {ErrorsNotifService} from '../../services/errors-notif.service';
import {ProduitPaginate} from '../../models/produit-paginate';
import {AppComponent} from '../../app.component';
import {CritereRecherche} from '../../models/critere-recherche';
import {HttpParams} from '@angular/common/http';
import {DataService} from '../../services/data.service';
import {LigneCommande} from '../../models/ligne-commande';
import {WishlistService} from '../../services/wishlist.service';
import {CompareService} from '../../services/compare.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {AuthentificationService} from '../../services/authentification.service';
import {Article} from '../../models/article';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  itemsProductsSize = 'items-products-size-1';
  categories: Categorie[];
  colors: Color[];
  matieres: Matiere[];
  public produits: Produit[] = [];
  produitPaginate: ProduitPaginate;
  criereRecherche: CritereRecherche = new CritereRecherche();
  show = 12;
  phone = false;
  tablet = false;
  pc15 = false;
  url: string = environment.urlServeur2;
  loggedInAdmin: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private categorieService: CategorieService,
              private colorService: ColorService,
              private matiereService: MatiereService,
              private serviceProduit: ProduitService,
              private notify: SnotifyService,
              private errorsNotifService: ErrorsNotifService,
              private shoppingCartService: ShoppingCartService,
              private compareService: CompareService,
              private wishlistService: WishlistService,
              private route: ActivatedRoute,
              private socket: Socket,
              public mainNav: MainNavComponent,
              private authService: AuthentificationService,
              public appComponent: AppComponent,
  ) {
  }

  ngOnInit() {
    this.socket
      .fromEvent<any>('quantiteSetNotification')
      .map(data => data).subscribe(value => {
      let articles: Article[] = [];
      articles = [...JSON.parse(value)];
      console.log('testhna');
      // console.log(articles);
      // console.log(this.produitPaginate);
      articles.forEach(value0 => {
        const tmp = this.produitPaginate.data.find(value1 => value1.article.id === value0.id);
        if (tmp) {
          tmp.article.stock = value0.stock;
        }
      });
      this.serviceProduit.setproduitPaginator(this.produitPaginate);
    });
    this.authService.authAdminStatus.subscribe(next => {
      this.loggedInAdmin = next;
    });
    this.breakpointObserver
      .observe('(max-width: 1350px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.itemsProductsSize = 'items-products-size-2';
          this.pc15 = true;
        } else {
          this.pc15 = false;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.itemsProductsSize = 'items-products-size-2';
          this.tablet = true;
        } else {
          this.tablet = false;
        }
      });
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.itemsProductsSize = 'items-products-size-3';
          this.phone = true;
        } else {
          this.phone = false;
        }
      });

    this.categorieService.categories.subscribe(value => {
      this.categories = value;
    });

    this.colorService.colors.subscribe(value => {
      this.colors = value;
    });

    this.serviceProduit.produitPaginator.subscribe(value => {
      this.produits = value.data;
      this.produitPaginate = value;
    });

    this.matiereService.matieres.subscribe(value => this.matieres = value);

  }

  delete(id: number) {
    this.notify.confirm('Sure to delete?', {
      position: 'rightTop',
      timeout: 0,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes', action: () => {
            this.serviceProduit.delete(id).subscribe(value => {
              this.serviceProduit.get(true, this.produitPaginate.current_page, this.produitPaginate.per_page, this.criereRecherche
              ).subscribe(value1 => {
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

  searchByCategorie_id(categorie_id) {
    this.appComponent.load = true;
    this.criereRecherche.categorie_id = categorie_id;
    this.serviceProduit.get(true, 1, this.produitPaginate.per_page, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  searchBySousCategorie_id(sous_categorie_id) {
    this.appComponent.load = true;
    this.criereRecherche.categorie_id = null;
    this.criereRecherche.sousCategorie_id = sous_categorie_id;
    this.serviceProduit.get(true, 1, this.produitPaginate.per_page, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  chnagePrice(prixFrom, prixTo) {
    this.appComponent.load = true;
    this.criereRecherche.prixTo = prixTo;
    this.criereRecherche.prixFrom = prixFrom;
    this.serviceProduit.get(true, 1, this.produitPaginate.per_page, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  changeColors(colors) {
    /*console.log(colors);
    console.log(colors.selectedOptions.selected.map(data => data.value));*/
    this.appComponent.load = true;
    this.criereRecherche.colors_id = colors.selectedOptions.selected.map(data => data.value);
    this.serviceProduit.get(true, 1, this.produitPaginate.per_page, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  changeMatieres(matieres) {
    this.appComponent.load = true;
    this.criereRecherche.matieres_id = matieres.selectedOptions.selected.map(data => data.value);
    this.serviceProduit.get(true, 1, this.produitPaginate.per_page, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  change(page, perPage = this.produitPaginate.per_page) {
    this.appComponent.load = true;
    this.serviceProduit.get(true, page, perPage, this.criereRecherche).subscribe(value => {
      this.appComponent.load = false;
    });
  }

  addToCompare(id) {
    this.compareService.addToCompare(id);
  }

  addToShoppingCart(pro: Produit) {
    const LC = new LigneCommande();
    LC.produit_id = pro.id;
    LC.quantite = 1;
    LC.produit = pro;
    this.shoppingCartService.addShoppingCart(LC);
  }


  addToWishlist(id) {
    this.wishlistService.addToWishlist(id);
  }
}
