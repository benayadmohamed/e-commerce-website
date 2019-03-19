import {Component, OnInit} from '@angular/core';
import {ModelErrors} from '../../../../models/model-errors';
import {FormControl, Validators} from '@angular/forms';
import {ErrorsMessagesService} from '../../../../services/errors-messages.service';
import {Categorie} from '../../../../models/categorie';
import {Produit} from '../../../../models/produit';
import {Marque} from '../../../../models/marque';
import {SousCategorie} from '../../../../models/sous-categorie';
import {Matiere} from '../../../../models/matiere';
import {Color} from '../../../../models/color';
import {ActivatedRoute} from '@angular/router';
import {ColorService} from '../../../../services/color.service';
import {SousCategorieService} from '../../../../services/sous-categorie.service';
import {MatiereService} from '../../../../services/matiere.service';
import {CategorieService} from '../../../../services/categorie.service';
import {ProduitService} from '../../../../services/produit.service';
import {MarqueService} from '../../../../services/marque.service';
import {ErrorsNotifService} from '../../../../services/errors-notif.service';
import {SnotifyService} from 'ng-snotify';
import {Image} from '../../../../models/image';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ReductionService} from '../../../../services/reduction.service';
import {Reduction} from '../../../../models/reduction';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent extends ModelErrors implements OnInit {
  produit: Produit = new Produit();
  sousCategories: SousCategorie[] = [];
  categories: Categorie[];
  marques: Marque[];
  colors: Color[];
  reductions: Reduction[];
  matieres: Matiere[];
  nbFile = 0;
  url: string = environment.urlServeur2;
  selected = 0;
  colors_id = [];
  matieres_id = [];

  constructor(private sousCategorieService: SousCategorieService,
              private notify: SnotifyService,
              private categorieService: CategorieService,
              private colorService: ColorService,
              private matiereService: MatiereService,
              private reductionService: ReductionService,
              private produitService: ProduitService,
              private marqueService: MarqueService,
              private errorsNotifService: ErrorsNotifService,
              private route: ActivatedRoute,
              erreursMessagesService: ErrorsMessagesService) {
    super(erreursMessagesService);
  }

  ngOnInit() {
    this.route.data.subscribe((value: { produit: Produit }) => {
      this.produit = value.produit;
      this.sousCategories = this.produit.categorie.sous_categories;
      this.colors_id = this.produit.article.colors.map(value1 => value1.id);
      this.matieres_id = this.produit.article.matieres.map(value1 => value1.id);
      console.log(this.colors_id);
      console.log(this.produit);
    }, error1 => {
      console.log(error1);
    });
    this.categorieService.categories.subscribe(value => {
      this.categories = value;
    });
    /* this.sousCategorieService.get().subscribe(cats => {
       this.sousCategories = cats;
     }, error1 => console.log(error1));
 */
    this.colorService.colors.subscribe(value => {
      this.colors = value;
    });
    this.reductionService.reductions.subscribe(value => {
      this.reductions = value;
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
    // this.email = new FormControl('', [Validators.required]);
    this.nbFile = this.produit.article.images.length;
  }

  save(myform: any) {
    this.produit.article.colors = this.colors_id;
    this.produit.article.matieres = this.matieres_id;
    const successAction = Observable.create(observer => {
      this.produitService.update(this.produit).subscribe(value => {
        observer.next(this.errorsNotifService.handleResponse2('', 'Success'));
        observer.complete();
        this.produitService.get(true);
      }, error1 => {
        console.log(error1);
        observer.error(this.errorsNotifService.handleErreur2('', 'Error'));
      });
    });

    this.errorsNotifService.asyncNotif(successAction);
  }

  changeSousCat(val: any) {
    const cat = this.categories.find(value => value.id === val.value);
    this.sousCategories = cat.sous_categories;
  }

  removeAll() {
    for (const image of this.produit.article.images) {
      if (image.id) {
        this.produitService.deleteImage(image).subscribe(value => {
          console.log(value);
        }, error1 => {
          console.log(error1);
        });
      }
    }
    this.produit.article.images = [];
    this.nbFile = this.produit.article.images.length;
  }

  remove(image: Image): void {
    const index = this.produit.article.images.indexOf(image);

    if (index >= 0) {
      this.produit.article.images.splice(index, 1);
    }
    if (image.id) {
      this.produitService.deleteImage(image).subscribe(value => {
        console.log(value);
      }, error1 => {
        console.log(error1);
      });
    }
    this.nbFile = this.produit.article.images.length;
  }

  OnChimages(images: any) {
    for (const file of images.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const Im = new Image();
        Im.name = file.name;
        Im.type = file.type;
        Im.value = reader.result.split(',')[1];
        Im.src = reader.result;
        console.log(reader.result);
        this.produit.article.images.push(Im);
        this.nbFile = this.produit.article.images.length;
      };
    }
  }
}
