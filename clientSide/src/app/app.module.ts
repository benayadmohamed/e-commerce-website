import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatarialModuleModule} from './matarial-module/matarial-module.module';
import {MainNavComponent} from './layout/main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MenuComponent} from './layout/menu/menu.component';
import {MenuAccountComponent} from './layout/menu-account/menu-account.component';
import {LoginComponent} from './pages/login/login.component';
import {MesRoutesModule} from './routes/mes-routes/mes-routes.module';
import {SingupComponent} from './pages/singup/singup.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {UserServicesService} from './services/user-services.service';
import {TokenService} from './services/token.service';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import {RequestResetPasswordComponent} from './pages/resetPassword/request-reset-password/request-reset-password.component';
import {ResponseResetPasswordComponent} from './pages/resetPassword/response-reset-password/response-reset-password.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {TestComponent} from './pages/test/test.component';
import {ErrorsMessagesService} from './services/errors-messages.service';
import {FooterComponent} from './layout/footer/footer.component';
import {AgmCoreModule} from '@agm/core';
import {AccountSettingsComponent} from './pages/accountsettings/account-settings/account-settings.component';
import {AdressesComponent} from './pages/accountsettings/adresses/adresses.component';
import {InformationPersonnelleComponent} from './pages/accountsettings/information-personnelle/information-personnelle.component';
import {CommandsComponent} from './pages/accountsettings/commands/commands.component';
import {BillingComponent} from './pages/accountsettings/adresses/billing/billing.component';
import {ShippingComponent} from './pages/accountsettings/adresses/shipping/shipping.component';
import {RegionComponent} from './pages/admin/region/region.component';
import {MenuAdminComponent} from './pages/admin/menu-admin/menu-admin.component';
import {VilleComponent} from './pages/admin/ville/ville.component';
import {DashboardComponent} from './pages/accountsettings/dashboard/dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContactComponent} from './pages/contact/contact.component';
import {MarqueComponent} from './pages/admin/marque/marque.component';
import {CategorieComponent} from './pages/admin/categorie/categorie.component';
import {SousCategorieComponent} from './pages/admin/sous-categorie/sous-categorie.component';
import {ProduitComponent} from './pages/admin/produit/produit.component';
import {AddProduitComponent} from './pages/admin/produit/add-produit/add-produit.component';
import {UpdateProduitComponent} from './pages/admin/produit/update-produit/update-produit.component';
import {ColorComponent} from './pages/admin/color/color.component';
import {HomeComponent} from './pages/home/home.component';
import {SlickCarouselModule} from './libs/slick-carousel/slick-carousel/slick-carousel.module';
import {ProduitsComponent} from './pages/produits/produits.component';
import {ScrollbarModule} from 'ngx-scrollbar';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatiereComponent} from './pages/admin/matiere/matiere.component';
import {DetailProduitComponent} from './pages/produits/detail-produit/detail-produit.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {ProduitsResolverService} from './services/resolvers/produits-resolver.service';
import {AdresseService} from './services/adresse.service';
import {Categorie} from './models/categorie';
import {CategorieService} from './services/categorie.service';
import {SousCategorieService} from './services/sous-categorie.service';
import {ColorService} from './services/color.service';
import {ContactService} from './services/contact.service';
import {MarqueService} from './services/marque.service';
import {MatiereService} from './services/matiere.service';
import {ProduitService} from './services/produit.service';
import {ProfileService} from './services/profile.service';
import {RegionService} from './services/region.service';
import {VilleService} from './services/ville.service';
import {InfoSiteComponent} from './pages/admin/info-site/info-site.component';
import {InfoSiteService} from './services/info-site.service';
import {RegionResolverService} from './services/resolvers/region-resolver.service';
import {RecaptchaModule} from 'ng-recaptcha';
import {MainComponent} from './layout/main/main.component';
import {AuthentificationService} from './services/authentification.service';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angular5-social-login';
import {environment} from '../environments/environment';
import {DataService} from './services/data.service';
import {WishlistComponent} from './pages/wishlist/wishlist.component';
import {CompareComponent} from './pages/compare/compare.component';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {ErrorComponent} from './pages/error/error.component';
import {ReductionComponent} from './pages/admin/reduction/reduction.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {TypeLivraisonComponent} from './pages/admin/type-livraison/type-livraison.component';
import {TarifComponent} from './pages/admin/tarif/tarif.component';
import {ListProduitsComponent} from './pages/admin/produit/list-produits/list-produits.component';
import {AuthentificationInterceptorService} from './services/authentification-interceptor.service';
import {CommandesComponent} from './pages/admin/commandes/commandes.component';
import {NewsCommandesComponent} from './pages/admin/commandes/news-commandes/news-commandes.component';
import {ShippedCommandesComponent} from './pages/admin/commandes/shipped-commandes/shipped-commandes.component';
import {DeliveredCommandesComponent} from './pages/admin/commandes/delivered-commandes/delivered-commandes.component';
import {ColsedCommandesComponent} from './pages/admin/commandes/colsed-commandes/colsed-commandes.component';
import {ActualiteComponent} from './pages/admin/actualite/actualite.component';
import {AddActualiteComponent} from './pages/admin/actualite/add-actualite/add-actualite.component';
import {UpdateActualiteComponent} from './pages/admin/actualite/update-actualite/update-actualite.component';
import {ListActualiteComponent} from './pages/admin/actualite/list-actualite/list-actualite.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WhoareweComponent} from './pages/whoarewe/whoarewe.component';
import {NewArrivalesComponent} from './pages/produits/new-arrivales/new-arrivales.component';
import {OnSaleComponent} from './pages/produits/on-sale/on-sale.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

export function getInfoSite(infoSiteService: InfoSiteService) {
  return () => infoSiteService.getInfoSite();
}

const configSocketIo: SocketIoConfig = {url: environment.urlServeur3, options: {}};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.FacebookClientId)
  }, {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GoogleClientId)
  }]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MenuComponent,
    MenuAccountComponent,
    LoginComponent,
    SingupComponent,
    ProfileComponent,
    BreadcrumbComponent,
    RequestResetPasswordComponent,
    ResponseResetPasswordComponent,
    TestComponent,
    FooterComponent,
    AccountSettingsComponent,
    AdressesComponent,
    InformationPersonnelleComponent,
    CommandsComponent,
    BillingComponent,
    ShippingComponent,
    RegionComponent,
    MenuAdminComponent,
    VilleComponent,
    DashboardComponent,
    ContactComponent,
    MarqueComponent,
    CategorieComponent,
    SousCategorieComponent,
    ProduitComponent,
    AddProduitComponent,
    UpdateProduitComponent,
    ColorComponent,
    HomeComponent,
    ProduitsComponent,
    MatiereComponent,
    DetailProduitComponent,
    InfoSiteComponent,
    MainComponent,
    WishlistComponent,
    CompareComponent,
    ShoppingCartComponent,
    ErrorComponent,
    ReductionComponent,
    CheckoutComponent,
    TypeLivraisonComponent,
    TarifComponent,
    ListProduitsComponent,
    CommandesComponent,
    NewsCommandesComponent,
    ShippedCommandesComponent,
    DeliveredCommandesComponent,
    ColsedCommandesComponent,
    ActualiteComponent,
    AddActualiteComponent,
    UpdateActualiteComponent,
    ListActualiteComponent,
    WhoareweComponent,
    NewArrivalesComponent,
    OnSaleComponent
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatarialModuleModule,
    MesRoutesModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjBJRd2iKHJnqhotJX4l37K5zW8aEqlcA'
    }),
    FlexLayoutModule,
    SlickCarouselModule,
    ScrollbarModule,
    NgxPaginationModule,
    SwiperModule,
    RecaptchaModule.forRoot(),
    SocialLoginModule,
    SocketIoModule.forRoot(configSocketIo),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    UserServicesService,
    AdresseService,
    CategorieService,
    SousCategorieService,
    ColorService,
    ContactService,
    MarqueService,
    MatiereService,
    ProduitService,
    ProfileService,
    RegionService,
    VilleService,
    TokenService,
    AuthentificationService,
    BeforeLoginService,
    AfterLoginService,
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    ErrorsMessagesService,
    ProduitsResolverService,
    InfoSiteService,
    RegionResolverService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptorService, multi: true},
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
