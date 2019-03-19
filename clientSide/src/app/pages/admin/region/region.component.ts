import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../../services/region.service';
import {Region} from '../../../models/region';
import {MatTableDataSource} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {Produit} from '../../../models/produit';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[];
  displayedColumns: string[] = ['name', 'actionsColumn'];
  public dataSource: Region[];
  public editCache = {};
  public addRegion = false;

  constructor(private regionService: RegionService, private notify: SnotifyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.regionService.regions.subscribe(value => {
      this.regions = value;
      this.dataSource = this.regions;
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Region(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.regionService.setRegions(this.dataSource.filter(value1 => value1.id !== -1));
      this.addRegion = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Region(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      this.regionService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.regionService.setRegions(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addRegion = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.regionService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.regionService.get(true);
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
            this.regionService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.regionService.setRegions(this.dataSource);
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
    this.addRegion = true;
    this.dataSource = [{id: -1, name: '', api_token: ''}, ...this.dataSource];
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
