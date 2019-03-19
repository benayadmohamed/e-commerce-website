import {Component, OnInit} from '@angular/core';
import {TypeLivraisonService} from '../../../services/type-livraison.service';
import {TypeLivraison} from '../../../models/type-livraison';
import {SnotifyService} from 'ng-snotify';
import {Tarif} from '../../../models/tarif';
import {TarifService} from '../../../services/tarif.service';
import {Produit} from '../../../models/produit';
import {ActivatedRoute} from '@angular/router';
import {VilleService} from '../../../services/ville.service';
import {Ville} from '../../../models/ville';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.css']
})
export class TarifComponent implements OnInit {


  tarifs: Tarif[];
  displayedColumns: string[] = ['name', 'ville', 'actionsColumn'];
  public dataSource: Tarif[];
  public villes: Ville[];
  public typeLivraisons: TypeLivraison[];
  public editCache = {};
  public addTarif = false;
  typeLivraison_id = 0;

  constructor(
    private route: ActivatedRoute,
    private tarifService: TarifService,
    private villeService: VilleService,
    private typeLivraisonService: TypeLivraisonService,
    private notify: SnotifyService) {
  }

  ngOnInit() {
    this.route.data.subscribe((value: { typeLivraison_id: number }) => {
      this.typeLivraison_id = value.typeLivraison_id;
    }, error1 => {
      console.log(error1);
    });

    this.tarifService.tarifs.subscribe(value => {

      this.tarifs = value ? value : [];
      this.dataSource = value ? value : [];
      this.initEditCache();
    });
    this.villeService.villes.subscribe(value => {
      this.villes = value;
    });
    this.typeLivraisonService.typeLivraisons.subscribe(value => {
      this.typeLivraisons = value;
    });
  }

  onChangeTypeLivraison_id(id) {
    this.typeLivraison_id = id;
    this.tarifService.get(this.typeLivraison_id, true).subscribe(value => {
      this.tarifs = value ? value : [];
      this.dataSource = value ? value : [];
      this.initEditCache();
    });
  }

  public initEditCache() {
    this.editCache = {};
    this.dataSource.forEach((value, i) => {
      if (!this.editCache[value.id + '']) {
        this.editCache[value.id + ''] = {index: i, edit: false, data: new Tarif(value)};
      }
    });
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    if (key === '-1') {
      this.tarifService.setTarifs(this.dataSource.filter(value1 => value1.id !== -1));
      this.addTarif = false;
    } else {
      const index = this.editCache[key].index;
      this.editCache[key].data = new Tarif(this.dataSource[index]);
      this.editCache[key].edit = false;
    }
  }

  saveEdit(key: string): void {
    const index = this.editCache[key].index;
    if (key === '-1') {
      this.tarifService.save(this.editCache[key].data).subscribe(value => {
        this.dataSource = this.dataSource.filter(value2 => value2.id !== -1);
        this.dataSource.unshift(value.data);
        this.tarifService.setTarifs(this.dataSource);
        this.handleResponse('Success');
      }, error1 => {
        console.log(error1);
        this.handleErreur('Error');
      });
      this.addTarif = false;
    } else {
      if (!this.isEquivalent(this.dataSource[index], this.editCache[key].data)) {
        this.dataSource[index] = this.editCache[key].data;
        this.tarifService.update(this.dataSource[index]).subscribe(value => {
          this.handleResponse('Success');
          this.editCache[key].edit = false;
          this.tarifService.setTarifs(this.dataSource);
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
            this.tarifService.delete(id).subscribe(value => {
              this.dataSource = this.dataSource.filter(value1 => value1.id !== id);
              this.tarifService.setTarifs(this.dataSource);
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
    this.addTarif = true;
    this.dataSource = [{id: -1, montant: 0, typeLivraison_id: this.typeLivraison_id, ville_id: 0}, ...this.dataSource];
    this.initEditCache();
    this.editCache['-1'].edit = true;
    // this.editCache['-1'].data.id = null;
  }

  isEquivalent(a, b) {
    if (a.montant === b.montant && a.ville_id === b.ville_id) {
      return true;
    }
    return false;
  }

}
