import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Adresse} from '../../../models/adresse';
import {AdresseService} from '../../../services/adresse.service';
import {RegionService} from '../../../services/region.service';
import {VilleService} from '../../../services/ville.service';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {
  @Input() user: User;


  constructor(private regionService: RegionService,
              private villeService: VilleService) {
  }

  ngOnInit() {
    this.regionService.get().subscribe(value1 => {
    });
    this.villeService.get().subscribe(value1 => {
    });
  }

}
