import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {TypeLivraison} from '../../../models/type-livraison';
import {TypeLivraisonService} from '../../../services/type-livraison.service';

@Component({
  selector: 'app-type-livraison',
  templateUrl: './type-livraison.component.html',
  styleUrls: ['./type-livraison.component.css']
})
export class TypeLivraisonComponent implements OnInit {


  typeLivraisons: TypeLivraison[];
  displayedColumns: string[] = ['name', 'info', 'actionsColumn'];
  public dataSource: TypeLivraison[];
  public editCache = {};
  public addTypeLivraison = false;

  constructor(private typeLivraisonService: TypeLivraisonService, private notify: SnotifyService) {
  }

  ngOnInit() {
    this.typeLivraisonService.typeLivraisons.subscribe(value => {
      this.typeLivraisons = value;
      this.dataSource = this.typeLivraisons;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new TypeLivraison(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.typeLivraisonService.setTypeLivraisons(this.dataSource.filter(value1 => value1.id !== -1));
      this.addTypeLivraison = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new TypeLivraison(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      this.typeLivraisonService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.typeLivraisonService.setTypeLivraisons(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addTypeLivraison = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.typeLivraisonService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.typeLivraisonService.setTypeLivraisons(this.dataSource);
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
            this.typeLivraisonService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.typeLivraisonService.setTypeLivraisons(this.dataSource);
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
    this.addTypeLivraison = true;
    this.dataSource = [{id: -1, name: '', info: ''}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.name === b.name && a.info === b.info) {
      return true;
    }
    return false;
  }

}
