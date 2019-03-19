import {Component, OnInit} from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {Color} from '../../../models/color';
import {ColorService} from '../../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {


  colors: Color[];
  displayedColumns: string[] = ['name', 'actionsColumn'];
  public dataSource: Color[];
  public editCache = {};
  public addColor = false;

  constructor(private colorService: ColorService, private notify: SnotifyService) {
  }

  ngOnInit() {
    this.colorService.colors.subscribe(value => {
      this.colors = value;
      this.dataSource = this.colors;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Color(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.colorService.setColors(this.dataSource.filter(value1 => value1.id !== -1));
      this.addColor = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Color(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    console.log(this.editCache[key]);
    const index = this.editCache[key].index;
    if (key === '-1') {
      /*this.dataSource[index] = this.editCache[key].data;*/
      this.colorService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.colorService.setColors(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addColor = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.colorService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.colorService.get(true);
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
            this.colorService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.colorService.setColors(this.dataSource);
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
    this.addColor = true;
    this.dataSource = [{id: -1, name: ''}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    this.editCache['-1'].data.name = '#000000';
  }

  isEquivalent(a, b) {
    if (a.name === b.name) {
      return true;
    }
    return false;
  }


}
