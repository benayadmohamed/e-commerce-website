import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../../pages/login/login.component';
import {SingupComponent} from '../../pages/singup/singup.component';
import {ProfileComponent} from '../../pages/profile/profile.component';
import {BeforeLoginService} from '../../services/before-login.service';
import {AfterLoginService} from '../../services/after-login.service';
import {RequestResetPasswordComponent} from '../../pages/resetPassword/request-reset-password/request-reset-password.component';
import {ResponseResetPasswordComponent} from '../../pages/resetPassword/response-reset-password/response-reset-password.component';
import {TestComponent} from '../../pages/test/test.component';
import {McBreadcrumbsModule} from 'ngx-breadcrumbs';
import {AccountSettingsComponent} from '../../pages/accountsettings/account-settings/account-settings.component';
import {AdressesComponent} from '../../pages/accountsettings/adresses/adresses.component';
import {AfterLoginAdminService} from '../../services/after-login-admin.service';
import {RegionComponent} from '../../pages/admin/region/region.component';
import {MenuAdminComponent} from '../../pages/admin/menu-admin/menu-admin.component';
import {VilleComponent} from '../../pages/admin/ville/ville.component';
import {DashboardComponent} from '../../pages/accountsettings/dashboard/dashboard.component';
import {InformationPersonnelleComponent} from '../../pages/accountsettings/information-personnelle/information-personnelle.component';
import {ContactComponent} from '../../pages/contact/contact.component';
import {MarqueComponent} from '../../pages/admin/marque/marque.component';
import {CategorieComponent} from '../../pages/admin/categorie/categorie.component';
import {SousCategorieComponent} from '../../pages/admin/sous-categorie/sous-categorie.component';
import {ProduitComponent} from '../../pages/admin/produit/produit.component';
import {AddProduitComponent} from '../../pages/admin/produit/add-produit/add-produit.component';
import {UpdateProduitComponent} from '../../pages/admin/produit/update-produit/update-produit.component';
import {ColorComponent} from '../../pages/admin/color/color.component';
import {HomeComponent} from '../../pages/home/home.component';
import {ProduitsComponent} from '../../pages/produits/produits.component';
import {MatiereComponent} from '../../pages/admin/matiere/matiere.component';
import {DetailProduitComponent} from '../../pages/produits/detail-produit/detail-produit.component';
import {ProduitsResolverService} from '../../services/resolvers/produits-resolver.service';
import {InfoSiteResolverService} from '../../services/resolvers/info-site-resolver.service';
import {InfoSiteComponent} from '../../pages/admin/info-site/info-site.component';
import {ProduitResolverService} from '../../services/resolvers/produit-resolver.service';
import {RegionResolverService} from '../../services/resolvers/region-resolver.service';
import {MainComponent} from '../../layout/main/main.component';
import {ProduitPaginate} from '../../models/produit-paginate';
import {ProduitsCategorieResolverService} from '../../services/resolvers/produits-categorie-resolver.service';
import {WishlistComponent} from '../../pages/wishlist/wishlist.component';
import {ProduitsWishlistResolverService} from '../../services/resolvers/produits-wishlist-resolver.service';
import {CompareComponent} from '../../pages/compare/compare.component';
import {ProduitsCompareResolverService} from '../../services/resolvers/produits-compare-resolver.service';
import {ProduitsShoppingCartResolverService} from '../../services/resolvers/produits-shopping-cart-resolver.service';
import {ShoppingCartComponent} from '../../pages/shopping-cart/shopping-cart.component';
import {CategorieResolverService} from '../../services/resolvers/categorie-resolver.service';
import {SousCategorieResolverService} from '../../services/resolvers/sous-categorie-resolver.service';
import {AccountSettingResolverService} from '../../services/resolvers/account-setting-resolver.service';
import {VilleResolverService} from '../../services/resolvers/ville-resolver.service';
import {MatiereResolverService} from '../../services/resolvers/matiere-resolver.service';
import {ColorResolverService} from '../../services/resolvers/color-resolver.service';
import {ReductionComponent} from '../../pages/admin/reduction/reduction.component';
import {ReductionResolverService} from '../../services/resolvers/reduction-resolver.service';
import {ProduitSettingResolverService} from '../../services/resolvers/produit-setting-resolver.service';
import {CheckoutComponent} from '../../pages/checkout/checkout.component';
import {CheckoutResolverService} from '../../services/resolvers/checkout-resolver.service';
import {TypeLivraisonComponent} from '../../pages/admin/type-livraison/type-livraison.component';
import {TypeLivraisonResolverService} from '../../services/resolvers/type-livraison-resolver.service';
import {TarifComponent} from '../../pages/admin/tarif/tarif.component';
import {TarifResolverService} from '../../services/resolvers/tarif-resolver.service';
import {ProduitsAdminResolverService} from '../../services/resolvers/produits-admin-resolver.service';
import {ListProduitsComponent} from '../../pages/admin/produit/list-produits/list-produits.component';
import {CommandesComponent} from '../../pages/admin/commandes/commandes.component';
import {CommandeAdminService} from '../../services/commande-admin.service';
import {CmmandeAdminResolverService} from '../../services/resolvers/cmmande-admin-resolver.service';
import {AddActualiteComponent} from '../../pages/admin/actualite/add-actualite/add-actualite.component';
import {ActualiteComponent} from '../../pages/admin/actualite/actualite.component';
import {UpdateActualiteComponent} from '../../pages/admin/actualite/update-actualite/update-actualite.component';
import {ListActualiteComponent} from '../../pages/admin/actualite/list-actualite/list-actualite.component';
import {HomeResolverService} from '../../services/resolvers/home-resolver.service';
import {ActualiteListService} from '../../services/resolvers/actualite-list.service';
import {ActualiteUpdateService} from '../../services/resolvers/actualite-update.service';
import {ErrorComponent} from '../../pages/error/error.component';
import {WhoareweComponent} from '../../pages/whoarewe/whoarewe.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }, {
    path: 'Error',
    component: ErrorComponent,
    data: {breadcrumbs: ''},
  }, {
    path: 'main',
    component: MainComponent,
    data: {breadcrumbs: 'Home'},
    resolve: {
      infoSite: InfoSiteResolverService
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, {
        path: 'whoarewe',
        component: WhoareweComponent,
        data: {breadcrumbs: 'whoarewe'}
      }, {
        path: 'home',
        component: HomeComponent,
        data: {breadcrumbs: ''},
        resolve: {
          valid: HomeResolverService
        }
      }, {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AfterLoginService],
        data: {breadcrumbs: 'Checkout'},
        resolve: {
          valid: CheckoutResolverService
        }
      }, {
        path: 'produits',
        component: ProduitsComponent,
        data: {breadcrumbs: 'AllProducts'},
        resolve: {
          produitPaginate: ProduitsResolverService
        }
      }, {
        path: 'wishlist',
        component: WishlistComponent,
        data: {breadcrumbs: 'wishlist'},
        resolve: {
          produitPaginate: ProduitsWishlistResolverService
        }
      }, {
        path: 'ShoppingCart',
        component: ShoppingCartComponent,
        data: {breadcrumbs: 'shoppingcart'},
        resolve: {
          produits: ProduitsShoppingCartResolverService
        }
      }, {
        path: 'compare',
        component: CompareComponent,
        data: {breadcrumbs: 'compare'},
        resolve: {
          produitPaginate: ProduitsCompareResolverService
        }
      }, {
        path: 'produits/:id',
        component: DetailProduitComponent,
        data: {breadcrumbs: 'Product'},
        resolve: {
          produit: ProduitResolverService
        }
      }, {
        path: 'produitsCat/:id',
        component: ProduitsComponent,
        data: {breadcrumbs: 'Products'},
        resolve: {
          produitPaginate: ProduitsCategorieResolverService
        }
      }, {
        path: 'login',
        component: LoginComponent,
        canActivate: [BeforeLoginService],
        data: {breadcrumbs: 'SignIn'},
        children: [
          {
            path: 'test',
            component: TestComponent,
            data: {breadcrumbs: 'Test'},
          }]
      },
      {
        path: 'admin',
        component: MenuAdminComponent,
        canActivate: [AfterLoginAdminService],
        canActivateChild: [AfterLoginAdminService],
        data: {breadcrumbs: 'administratorspace'},
        children: [
          {
            path: 'infoSite',
            component: InfoSiteComponent,
            data: {breadcrumbs: 'Siteinformation'},
            resolve: {
              infoSite: InfoSiteResolverService
            }
          }, {
            path: 'typeLivraison2',
            redirectTo: 'typeLivraison',
            pathMatch: 'full'
          }, {
            path: 'typeLivraison',
            component: TypeLivraisonComponent,
            data: {breadcrumbs: 'Deliverymethod'},
            resolve: {
              valid: TypeLivraisonResolverService,
            }
          }, {
            path: 'tarif',
            component: TarifComponent,
            data: {breadcrumbs: 'Rate'},
            resolve: {
              typeLivraison_id: TarifResolverService,
            }
          }, {
            path: 'commandes',
            component: CommandesComponent,
            data: {breadcrumbs: 'listoforders'},
            resolve: {
              typeLivraison_id: CmmandeAdminResolverService,
            }
          }, {
            path: 'color',
            component: ColorComponent,
            data: {breadcrumbs: 'Listofcolor'},
            resolve: {
              valid: ColorResolverService,
            }
          }, {
            path: 'reduction',
            component: ReductionComponent,
            data: {breadcrumbs: 'ListReduction'},
            resolve: {
              valid: ReductionResolverService,
            }
          }, {
            path: 'matiere',
            component: MatiereComponent,
            data: {breadcrumbs: 'Listofmaterial'},
            resolve: {
              valid: MatiereResolverService,
            }
          }, {
            path: 'region',
            component: RegionComponent,
            data: {breadcrumbs: 'listofregions'},
            resolve: {
              valid: RegionResolverService,
            }
          }, {
            path: 'ville',
            component: VilleComponent,
            data: {breadcrumbs: 'Listofcity'},
            resolve: {
              valid: VilleResolverService,
            }
          }, {
            path: 'marque',
            component: MarqueComponent,
            data: {breadcrumbs: 'List Marque'},
          }, {
            path: 'categorie',
            component: CategorieComponent,
            data: {breadcrumbs: 'Listofcategory'},
            resolve: {
              valid: CategorieResolverService,
            }
          }, {
            path: 'sousCategorie',
            component: SousCategorieComponent,
            data: {breadcrumbs: 'Listofsubcategory'},
            resolve: {
              valid: SousCategorieResolverService,
            }
          }, {
            path: '',
            redirectTo: 'produit',
            pathMatch: 'full'
          }, {
            path: 'produit',
            component: ProduitComponent,
            data: {breadcrumbs: 'Product'},
            resolve: {
              valid: ProduitSettingResolverService
            },
            children: [
              {
                path: '',
                redirectTo: 'addProduit',
                pathMatch: 'full'
              }, {
                path: 'addProduit',
                component: AddProduitComponent,
                data: {breadcrumbs: 'newproduct'},
              }, {
                path: 'updateProduit/:id',
                component: UpdateProduitComponent,
                data: {breadcrumbs: 'Modification'},
                resolve: {
                  produit: ProduitResolverService
                }
              }, {
                path: 'listProduits',
                component: ListProduitsComponent,
                data: {breadcrumbs: 'AllProducts'},
                resolve: {
                  produit: ProduitsAdminResolverService
                }
              },
            ],
          }, {
            path: 'actualite',
            component: ActualiteComponent,
            data: {breadcrumbs: 'actuality'},
            children: [
              {
                path: '',
                redirectTo: 'addActualite',
                pathMatch: 'full'
              }, {
                path: 'addActualite',
                component: AddActualiteComponent,
                data: {breadcrumbs: 'newactuality'},
              }, {
                path: 'updateActualite/:id',
                component: UpdateActualiteComponent,
                data: {breadcrumbs: 'Modification'},
                resolve: {
                  actualite: ActualiteUpdateService
                }
              }, {
                path: 'listActualites',
                component: ListActualiteComponent,
                data: {breadcrumbs: 'List Actualites'},
                resolve: {
                  valid: ActualiteListService
                }
              },
            ],
          },
        ]
      },
      {
        path: 'signup',
        component: SingupComponent,
        canActivate: [BeforeLoginService],
        data: {breadcrumbs: 'signup'}
      }, {
        path: 'contact',
        component: ContactComponent,
        data: {breadcrumbs: 'contact'}
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AfterLoginService],
        data: {breadcrumbs: 'Profile'}
      },
      {
        path: 'requestResetPassword',
        component: RequestResetPasswordComponent,
        canActivate: [BeforeLoginService],
        data: {breadcrumbs: 'Send'}
      },
      {
        path: 'responseResetPassword',
        component: ResponseResetPasswordComponent,
        canActivate: [BeforeLoginService],
        data: {breadcrumbs: 'Changepassword'}
      },
      {
        path: 'accountSettingsComponent',
        component: AccountSettingsComponent,
        canActivate: [AfterLoginService],
        canActivateChild: [AfterLoginService],
        data: {breadcrumbs: 'accountSettings'},
        resolve: {valid: AccountSettingResolverService},
        children: [

          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }, {
            path: 'commandes',
            component: CommandesComponent,
            data: {breadcrumbs: 'listoforders'},
            resolve: {
              typeLivraison_id: CmmandeAdminResolverService,
            }
          }, {
            path: 'adresses',
            component: AdressesComponent,
            data: {breadcrumbs: 'addresses'},
          }, {
            path: 'dashboard',
            component: DashboardComponent,
            data: {breadcrumbs: 'accountDashboard'},
          },
          {
            path: 'infoP',
            component: InformationPersonnelleComponent,
            data: {breadcrumbs: 'AccountInformation'},
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    McBreadcrumbsModule.forRoot()
  ],
  exports: [RouterModule, McBreadcrumbsModule],
  declarations: []
})
export class MesRoutesModule {
}
