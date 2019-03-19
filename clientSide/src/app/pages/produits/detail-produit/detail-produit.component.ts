import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {ProduitService} from '../../../services/produit.service';
import {Produit} from '../../../models/produit';
import {environment} from '../../../../environments/environment';
import {LigneCommande} from '../../../models/ligne-commande';
import {WishlistService} from '../../../services/wishlist.service';
import {SnotifyService} from 'ng-snotify';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {ErrorsNotifService} from '../../../services/errors-notif.service';
import {CompareService} from '../../../services/compare.service';
import {AuthentificationService} from '../../../services/authentification.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit, AfterViewInit {
  test: any;
  public config: SwiperConfigInterface = {zoom: true};
  public config2: SwiperConfigInterface = {
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 10,
    mousewheel: true,
    navigation: true,
    slideToClickedSlide: true,
  };
  public config3: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: true,
  };
  url: string = environment.urlServeur2;
  produit: Produit = new Produit();
  numberProduit = 1;
  loggedInAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private notify: SnotifyService,
    private errorsNotifService: ErrorsNotifService,
    private shoppingCartService: ShoppingCartService,
    private compareService: CompareService,
    private wishlistService: WishlistService,
    private authService: AuthentificationService,
    private routerE: Router) {
  }

  addNbProduit() {
    if (this.produit.article.stock > this.numberProduit) {
      this.numberProduit++;
    }
  }

  removeNbProduit() {
    if (0 < this.numberProduit) {
      this.numberProduit--;
    }
  }

  ngOnInit() {
    // Capture the session ID if available
    /* this.route.params.subscribe(value => {
       console.log(value.id);
       this.produitService.getById(value.id).subscribe(value1 => {
         this.produit = value1;
       });
     });*/
    this.authService.authAdminStatus.subscribe(next => {
      this.loggedInAdmin = next;
    });
    this.route.data.subscribe((value: { produit: Produit }) => {
      this.produit = value.produit;
      console.log(value);
    }, error1 => {
      console.log(error1);
    });
  }

  ngAfterViewInit(): void {
  }

  addToCompare(id) {
    this.compareService.addToCompare(id);
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
  }


  addToWishlist(id) {
    this.wishlistService.addToWishlist(id);
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

}
