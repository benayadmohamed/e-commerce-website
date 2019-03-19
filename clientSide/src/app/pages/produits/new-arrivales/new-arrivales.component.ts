import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../services/produit.service';
import {ProduitPaginate} from '../../../models/produit-paginate';
import {Produit} from '../../../models/produit';
import {LigneCommande} from '../../../models/ligne-commande';
import {environment} from '../../../../environments/environment';
import {WishlistService} from '../../../services/wishlist.service';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {CompareService} from '../../../services/compare.service';
import {ScreenService} from '../../../services/screen.service';

@Component({
  selector: 'app-new-arrivales',
  templateUrl: './new-arrivales.component.html',
  styleUrls: ['./new-arrivales.component.css']
})
export class NewArrivalesComponent implements OnInit {

  produitPaginate: ProduitPaginate = new ProduitPaginate();
  produits: Produit[];
  url: string = environment.urlServeur2;
  load = false;

  constructor(private produitService: ProduitService,
              private shoppingCartService: ShoppingCartService,
              private screenService: ScreenService,
              private compareService: CompareService,
              private wishlistService: WishlistService) {
  }

  ngOnInit() {
    this.screenService.isLargPc.subscribe(value => {
      if (value) {
        this.produitPaginate.per_page = 6;
        if (this.produits.length < 6 && this.produitPaginate.total >= 6) {
          this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true).subscribe(value1 => {
            this.produits = value1.data;
            this.produitPaginate = value1;
          });
        }
      }
    });
    this.screenService.isSmallPc.subscribe(value => {
      if (value) {
        this.produitPaginate.per_page = 5;
        if (this.produits.length > 5) {
          this.produits = this.produits.splice(0, 5);
        }
        if (this.produits.length < 5 && this.produitPaginate.total >= 5) {
          this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true).subscribe(value1 => {
            this.produits = value1.data;
            this.produitPaginate = value1;
          });
        }
      }
    });
    this.screenService.isPhone.subscribe(value => {
      if (value) {
        this.produitPaginate.per_page = 1;
        if (this.produits.length > 1) {
          this.produits = this.produits.splice(0, 1);
        }
      }
    });
    this.screenService.isSmallTablet.subscribe(value => {
      if (value) {
        this.produitPaginate.per_page = 2;
        if (this.produits.length > 2) {
          this.produits = this.produits.splice(0, 4);
        }
        if (this.produits.length < 2 && this.produitPaginate.total >= 2) {
          this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true).subscribe(value1 => {
            this.produits = value1.data;
            this.produitPaginate = value1;
          });
        }
      }
    });
    this.screenService.isTablet.subscribe(value => {
      if (value) {
        this.produitPaginate.per_page = 4;
        if (this.produits.length > 4) {
          this.produits = this.produits.splice(0, 4);
        }
        if (this.produits.length < 4 && this.produitPaginate.total >= 4) {
          this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true).subscribe(value1 => {
            this.produits = value1.data;
            this.produitPaginate = value1;
          });
        }
      }
    });
    this.produitService.load.subscribe(value => {
      this.load = value;
    });
    this.produitService.getNewArrivale(1, this.produitPaginate.per_page).subscribe(value => {
      this.produits = value.data;
      this.produitPaginate = value;
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

  prev() {
    this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true, this.produitPaginate.prev_page_url).subscribe(value => {
      this.produits = value.data;
      this.produitPaginate = value;

    });
  }

  next() {
    this.produitService.getNewArrivale(1, this.produitPaginate.per_page, true, this.produitPaginate.next_page_url).subscribe(value => {
      this.produits = value.data;
      this.produitPaginate = value;
    });
  }
}
