import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {SousCategorie} from '../../../models/sous-categorie';
import {SousCategorieService} from '../../../services/sous-categorie.service';
import {Categorie} from '../../../models/categorie';
import {CategorieService} from '../../../services/categorie.service';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css']
})
export class SousCategorieComponent implements OnInit {

  sousCategories: SousCategorie[];
  categories: Categorie[];
  displayedColumns: string[] = ['name', 'categorie_id', 'actionsColumn'];
  public dataSource: SousCategorie[];
  public editCache = {};
  public addSousCategorie = false;

  constructor(private sousCategorieService: SousCategorieService,
              private notify: SnotifyService, private categorieService: CategorieService) {
  }

  ngOnInit() {
    this.sousCategorieService.sousCategories.subscribe(value => {
      this.sousCategories = value;
      this.dataSource = this.sousCategories;
      this.initEditCache();
      console.log('ja');
      this.categorieService.get(true).subscribe(value1 => {
      });
    });
    this.categorieService.categories.subscribe(value => {
      console.log('ja2');
      this.categories = value;
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new SousCategorie(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.dataSource = this.dataSource.filter(value1 => value1.id !== -1);
      this.initEditCache();
      this.addSousCategorie = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new SousCategorie(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      /*this.dataSource[index] = this.editCache[key].data;*/
      this.sousCategorieService.save(this.editCache[key].data).subscribe(value => {
        // this.dataSource = [value.data, ...this.dataSource];
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.sousCategorieService.setSousCategories(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addSousCategorie = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.sousCategorieService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.sousCategorieService.get(true);

        }, error1 => {
          console.log(error1);
          this.handleErreur('Error');
        });
      } else {
        this.cancelEdit(key);
      }
    }
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
            this.sousCategorieService.delete(id).subscribe(value => {
              this.handleResponse('Success');
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.sousCategorieService.setSousCategories(this.dataSource);
            }, error1 => {
              this.handleErreur('Erreur');
              console.log(error1);
            });
          }, bold: false
        },
        {text: 'No', action: () => this.notify.clear()},
      ]
    });
  }

  private handleResponse(msg: string) {
    this.notify.clear();
    this.categorieService.get(true);
    this.notify.success(msg, {position: 'rightTop'});
  }

  private handleErreur(msg: string) {
    this.notify.clear();
    this.notify.error(msg, {position: 'rightTop'});
    // this.erreur = erreur.error.error;
  }

  add() {
    this.addSousCategorie = true;
    this.dataSource = [{id: -1, name: '', categorie_id: 0}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.name === b.name && a.categorie_id === b.categorie_id) {
      return true;
    }
    return false;
  }


}
