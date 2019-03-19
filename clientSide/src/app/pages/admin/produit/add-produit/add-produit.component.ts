import {Component, OnInit} from '@angular/core';
import {Produit} from '../../../../models/produit';
import {SousCategorie} from '../../../../models/sous-categorie';
import {Categorie} from '../../../../models/categorie';
import {SnotifyService} from 'ng-snotify';
import {CategorieService} from '../../../../services/categorie.service';
import {SousCategorieService} from '../../../../services/sous-categorie.service';
import {Color} from '../../../../models/color';
import {ColorService} from '../../../../services/color.service';
import {ProduitService} from '../../../../services/produit.service';
import {Marque} from '../../../../models/marque';
import {MarqueService} from '../../../../services/marque.service';
import {File} from '../../../../models/file';
import {Image} from '../../../../models/image';
import {ModelErrors} from '../../../../models/model-errors';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {FormControl, Validators} from '@angular/forms';
import {Matiere} from '../../../../models/matiere';
import {MatiereService} from '../../../../services/matiere.service';
import {Observable} from 'rxjs';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Region} from '../../../../models/region';
import {MatChipInputEvent} from '@angular/material';
import {ProduitComponent} from '../produit.component';
import {ProduitsComponent} from '../../../produits/produits.component';
import {ReductionService} from '../../../../services/reduction.service';
import {Reduction} from '../../../../models/reduction';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent extends ModelErrors implements OnInit {

  produit: Produit = new Produit();
  sousCategories: SousCategorie[] = [];
  categories: Categorie[];
  reductions: Reduction[];
  marques: Marque[];
  colors: Color[];
  matieres: Matiere[];
  nbFile = 0;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Region[] = [
    {id: 1, name: 'Lemon', api_token: ''}];

  constructor(private sousCategorieService: SousCategorieService,
              private notify: SnotifyService,
              private errorsNotifService: ErrorsNotifService,
              private categorieService: CategorieService,
              private colorService: ColorService,
              private reductionService: ReductionService,
              private matiereService: MatiereService,
              private produitService: ProduitService,
              private marqueService: MarqueService,
              /*      public produitsComponent: ProduitsComponent,*/
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.categorieService.categories.subscribe(value => {
      this.categories = value;
    });
    this.reductionService.reductions.subscribe(value => {
      this.reductions = value;
    });
    /* this.sousCategorieService.get().subscribe(cats => {
       this.sousCategories = cats;
     }, error1 => console.log(error1));
 */
    this.colorService.colors.subscribe(value => {
      this.colors = value;
    });

    this.matiereService.matieres.subscribe(value => {
      this.matieres = value;
    });

    this.marqueService.get().subscribe(value => {
      this.marques = value;
    }, error1 => console.log(error1));

    this.name = new FormControl('', [Validators.required]);
    this.prix = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]);
    this.stock = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
    this.email = new FormControl('', [Validators.required]);
    this.produit.article.images = [];
  }

  OnChimages(images: any) {
    /* this.produit.article.images = [];*/
    for (const file of images.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const Im = new Image();
        Im.name = file.name;
        Im.type = file.type;
        Im.value = reader.result.split(',')[1];
        Im.src = reader.result;
        // console.log(reader.result);
        this.produit.article.images.push(Im);
        // this.produit.article.images = [...this.produit.article.images, Im];
        this.nbFile = this.produit.article.images.length;
      };
    }
  }

  save(myform: any) {
    const successAction = Observable.create(observer => {
      this.produitService.save(this.produit).subscribe(value => {
        console.log(value);
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        this.produitService.get(true);
        this.produit = new Produit();
        this.produit.article.images = [];
        this.nbFile = 0;
        // myform.reset();
        observer.complete();
      }, error1 => {
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

  changeSousCat(val: any) {
    const cat = this.categories.find(value => value.id === val.value);
    this.sousCategories = cat.sous_categories;
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({id: 0, api_token: '', name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAll() {
    this.produit.article.images = [];
    this.nbFile = this.produit.article.images.length;
  }

  remove(image: Image): void {
    const index = this.produit.article.images.indexOf(image);

    if (index >= 0) {
      this.produit.article.images.splice(index, 1);
    }
    this.nbFile = this.produit.article.images.length;
  }
}
