import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Reduction} from '../../../models/reduction';
import {ReductionService} from '../../../services/reduction.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reduction',
  templateUrl: './reduction.component.html',
  styleUrls: ['./reduction.component.css']
})
export class ReductionComponent implements OnInit {

  reductions: Reduction[];
  displayedColumns: string[] = ['valeurPourcentage', 'actionsColumn'];
  public dataSource: Reduction[];
  public editCache = {};
  public addReduction = false;

  constructor(private reductionService: ReductionService, private notify: SnotifyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.reductionService.reductions.subscribe(value => {
      this.reductions = value;
      this.dataSource = this.reductions;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Reduction(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.reductionService.setReductions(this.dataSource.filter(value1 => value1.id !== -1));
      this.addReduction = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Reduction(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      this.reductionService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.reductionService.setReductions(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addReduction = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.reductionService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.reductionService.get(true);
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
            this.reductionService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.reductionService.setReductions(this.dataSource);
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
    this.addReduction = true;
    this.dataSource = [{id: -1, valeurPourcentage: 0}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.valeurPourcentage === b.valeurPourcentage) {
      return true;
    }
    return false;
  }

}
