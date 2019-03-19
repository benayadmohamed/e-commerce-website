import {Component, OnInit} from '@angular/core';
import {MatiereService} from '../../../services/matiere.service';
import {Matiere} from '../../../models/matiere';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  matieres: Matiere[];
  displayedColumns: string[] = ['name', 'actionsColumn'];
  public dataSource: Matiere[];
  public editCache = {};
  public addMatiere = false;

  constructor(private matiereService: MatiereService, private notify: SnotifyService) {
  }

  ngOnInit() {
    this.matiereService.matieres.subscribe(value => {
      this.matieres = value;
      this.dataSource = this.matieres;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Matiere(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.matiereService.setMatieres(this.dataSource.filter(value1 => value1.id !== -1));
      this.addMatiere = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Matiere(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      /*this.dataSource[index] = this.editCache[key].data;*/
      this.matiereService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.matiereService.setMatieres(this.dataSource);
        this.handleResponse('Success');

      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addMatiere = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.matiereService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.matiereService.get(true);
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
            this.matiereService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.matiereService.setMatieres(this.dataSource);
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
    this.addMatiere = true;
    this.dataSource = [{id: -1, name: ''}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.name === b.name) {
      return true;
    }
    return false;
  }


}
