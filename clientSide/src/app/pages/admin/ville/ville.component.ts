import {Component, OnInit} from '@angular/core';
import {Ville} from '../../../models/ville';
import {SnotifyService} from 'ng-snotify';
import {VilleService} from '../../../services/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
  villes: Ville[];
  displayedColumns: string[] = ['name', 'actionsColumn'];
  public dataSource: Ville[];
  public editCache = {};
  public addVille = false;

  constructor(private villeService: VilleService, private notify: SnotifyService) {
  }

  ngOnInit() {
    this.villeService.villes.subscribe(value => {
      this.villes = value;
      this.dataSource = this.villes;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Ville(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.villeService.setVilles(this.dataSource.filter(value1 => value1.id !== -1));
      this.addVille = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Ville(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      /*this.dataSource[index] = this.editCache[key].data;*/
      this.villeService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.villeService.setVilles(this.dataSource);
        this.handleResponse('Success');

      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addVille = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.villeService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.villeService.get(true);
        }, error1 => {
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
            this.villeService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.villeService.setVilles(this.dataSource);
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
    this.addVille = true;
    this.dataSource = [{id: -1, name: '', api_token: ''}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    let propName;
    for (let i = 0; i < aProps.length; i++) {
      propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }


}
