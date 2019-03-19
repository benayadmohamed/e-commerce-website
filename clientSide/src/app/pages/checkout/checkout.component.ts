import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Adresse} from '../../models/adresse';
import {RegionService} from '../../services/region.service';
import {TokenService} from '../../services/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServicesService} from '../../services/user-services.service';
import {VilleService} from '../../services/ville.service';
import {Region} from '../../models/region';
import {Ville} from '../../models/ville';
import {CheckoutService} from '../../services/checkout.service';
import {Commande} from '../../models/commande';
import {TypeLivraison} from '../../models/type-livraison';
import {TypeLivraisonService} from '../../services/type-livraison.service';
import {TarifService} from '../../services/tarif.service';
import {Tarif} from '../../models/tarif';
import {Livraison} from '../../models/livraison';
import {Paiement} from '../../models/paiement';
import {TypePaiement} from '../../models/type-paiement.enum';
import {Statuts} from '../../models/statuts.enum';
import {CommandeService} from '../../services/commande.service';
import {e} from '@angular/core/src/render3';
import {AdresseService} from '../../services/adresse.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {WishlistService} from '../../services/wishlist.service';
import {CompareService} from '../../services/compare.service';
import {Socket} from 'ngx-socket-io';
import {InfoSite} from '../../models/info-site';
import {PayPalConfig, PayPalEnvironment, PayPalIntegrationType} from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnChanges {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  adresse: Adresse = new Adresse();
  regions: Region[];
  villes: Ville[];
  commande: Commande;
  typeLivraisons: TypeLivraison[];
  typeLivraison_id: number;
  tarif: Tarif;
  typePaiement = 0;
  commandeValid = false;
  load = false;
  public payPalConfig?: PayPalConfig;

  constructor(private formBuilder: FormBuilder,
              private userService: UserServicesService,
              private checkoutService: CheckoutService,
              private commandeService: CommandeService,
              private socket: Socket,
              private route: ActivatedRoute,
              private router: Router,
              private adresseService: AdresseService,
              private typeLivraisonService: TypeLivraisonService,
              private tarifService: TarifService,
              private regionService: RegionService,
              private wishlistService: WishlistService,
              private compareService: CompareService,
              private shoppingCartService: ShoppingCartService,
              private villeService: VilleService) {
  }


  ngOnChanges(): void {

  }

  ngOnInit() {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AbI4yMNwcUg9bMnX3C6-cGiZiGKHdECsCGDOqt8DczcOQCnpeP1q8b4jRwLIO7FSY_MoK4plfSjhESwT'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete O');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: 0
        }
      }]
    });
    this.checkoutService.commande.subscribe(value => this.commande = value);

    this.regionService.regions.subscribe(value => {
      this.regions = value;
    });
    this.typeLivraisonService.typeLivraisons.subscribe(value => {
      this.typeLivraisons = value;
    });
    this.villeService.villes.subscribe(value => {
      this.villes = value;
    });
    this.userService.user.subscribe(value => {
      this.adresse = value.profile.adresses.find(value1 => value1.type === 'pro');
    });
    this.firstFormGroup = this.formBuilder.group({
      fName: [this.adresse.FName, Validators.required],
      lName: [this.adresse.LName, Validators.required],
      phone: [this.adresse.phone, Validators.required],
      adresse: [this.adresse.address, Validators.required],
      info: [this.adresse.info],
      Region: [this.adresse.region_id, Validators.required],
      ville: [this.adresse.ville_id, Validators.required],
    });

    /*  this.firstFormGroup = new FormGroup({
      fName: new FormControl(this.adresse.FName, Validators.required),
      lName: new FormControl(this.adresse.LName, Validators.required),
      phone: new FormControl(this.adresse.phone, Validators.required),
      adresse: new FormControl(this.adresse.address, Validators.required),
      info: new FormControl(this.adresse.info),
      Region: new FormControl(this.adresse.region_id, Validators.required),
      ville: new FormControl(this.adresse.ville_id, Validators.required),
    });*/
    this.secondFormGroup = this.formBuilder.group({
      typeL: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      typeP: [this.typePaiement, Validators.required]
    });
  }

  paypal() {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AbI4yMNwcUg9bMnX3C6-cGiZiGKHdECsCGDOqt8DczcOQCnpeP1q8b4jRwLIO7FSY_MoK4plfSjhESwT'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete O');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: 1
        }
      }]
    });
  }

  cash() {
    const commande = new Commande();
    const livraison = new Livraison();
    livraison.typeLivraison_id = this.typeLivraison_id;
    const paiement = new Paiement();
    paiement.type = TypePaiement.cash;
    commande.total = this.commande.total + this.tarif.montant;
    commande.statut = Statuts.new;
    commande.ligneCommandes = this.commande.ligneCommandes;
    commande.livraison = livraison;
    commande.paiement = paiement;
    console.log(commande, this.tarif);
    this.load = true;
    this.adresseService.update(this.adresse).subscribe(value => {
      this.commandeService.save(commande).subscribe(value2 => {
        this.commandeValid = true;
        this.load = false;
        this.shoppingCartService.setproduitPaginator([]);
        this.wishlistService.wishListIsModified = true;
        this.compareService.compareIsModified = true;
        this.checkoutService.setCommande(null);
        this.socket.emit('quantiteSetNotification', JSON.stringify(value2.articles));
        this.socket.emit('CommandeAdminNotification', JSON.stringify(value2.idCmd));
        console.log(value2);
      }, error1 => {
        console.log(error1);
      });
    });
  }


  changeTL(id) {
    console.log(this.adresse);
    this.typeLivraison_id = id;
    this.tarifService.get2(id, this.adresse.ville_id).subscribe(value => {
      this.tarif = value;
    });
  }

}
