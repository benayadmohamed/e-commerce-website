import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Categorie} from '../../../models/categorie';
import {CategorieService} from '../../../services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {


  categories: Categorie[];
  displayedColumns: string[] = ['name', 'sexe', 'actionsColumn'];
  public dataSourceCategorie: Categorie[];
  public editCacheCategorie = {};
  public addCategorie = false;

  constructor(private categorieService: CategorieService, private notify: SnotifyService) {
  }

  ngOnInit() {
    this.categorieService.categories.subscribe(value => {
      this.categories = value;
      this.dataSourceCategorie = value;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCacheCategorie = {};
    this.dataSourceCategorie.forEach((value, i) => {
      if (!this.editCacheCategorie[value.id + '']) {
        this.editCacheCategorie[value.id + ''] = {index: i, edit: false, data: new Categorie(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCacheCategorie[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.categorieService.setCategories(this.dataSourceCategorie.filter(value1 => value1.id !== -1));
      this.addCategorie = false;
    } else {
      const index = this.editCacheCategorie[key].index;
      this.editCacheCategorie[key].data = new Categorie(this.dataSourceCategorie[index]);
      this.editCacheCategorie[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCacheCategorie[key].index;
    if (key === '-1') {
      /*this.dataSourceCategorie[index] = this.editCacheCategorie[key].data;*/
      this.categorieService.save(this.editCacheCategorie[key].data).subscribe(value => {
        // this.dataSourceCategorie = [value.data, ...this.dataSourceCategorie];
        this.dataSourceCategorie = this.dataSourceCategorie.filter(value2 => value2.id !== -1);
        this.dataSourceCategorie.unshift(value.data);
        this.categorieService.setCategories(this.dataSourceCategorie);
        this.handleResponse('Success');
      }, error1 => {
        this.handleErreur('Error');
      });
      this.addCategorie = false;
    } else {
      if (!this.isEquivalent(this.dataSourceCategorie[index], this.editCacheCategorie[key].data)) {
        this.dataSourceCategorie[index] = this.editCacheCategorie[key].data;
        this.categorieService.update(this.dataSourceCategorie[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCacheCategorie[key].edit = false;
          this.categorieService.get(true);
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
            this.categorieService.delete(id).subscribe(value => {
              this.dataSourceCategorie = this.dataSourceCategorie.filter(value1 => value1.id !== id);
              this.categorieService.setCategories(this.dataSourceCategorie);
              this.handleResponse('Success');
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
    this.notify.success(msg, {position: 'rightTop'});
  }

  private handleErreur(msg: string) {
    this.notify.clear();
    this.notify.error(msg, {position: 'rightTop'});
    // this.erreur = erreur.error.error;
  }

  add() {
    this.addCategorie = true;
    this.dataSourceCategorie = [{id: -1, name: '', sexe: ''}, ...this.dataSourceCategorie];
    this.initEditCache();
    this.editCacheCategorie['-1'].edit = true;
    // this.editCacheCategorie['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.name === b.name && a.sexe === b.sexe) {
      return true;
    }
    return false;
  }

}
