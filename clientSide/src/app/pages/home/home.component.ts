import {Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ActualiteService} from '../../services/actualite.service';
import {Actualite} from '../../models/actualite';
import {environment} from '../../../environments/environment';
import {LigneCommande} from '../../models/ligne-commande';
import {Produit} from '../../models/produit';
import {WishlistService} from '../../services/wishlist.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {CompareService} from '../../services/compare.service';
import {ProduitService} from '../../services/produit.service';
import {Socket} from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public config: SwiperConfigInterface = {
    slidesPerView: 1,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      stopOnLastSlide: false
    },
    speed: 300,
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
  };

  index;
  actualies: Actualite[];
  url: string = environment.urlServeur2;

  constructor(private actualiteService: ActualiteService,
              private socket: Socket,
              private produitService: ProduitService
  ) {
  }

  ngOnInit() {
    this.socket.emit('quantiteSetNotification', JSON.stringify([]));
    this.socket.emit('setWishlist', JSON.stringify([]));

    this.actualiteService.actualies.subscribe(value => {
      this.actualies = value;
    });
  }


}
