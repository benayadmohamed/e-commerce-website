import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Categorie} from '../../models/categorie';
import {InfoSite} from '../../models/info-site';
import {InfoSiteService} from '../../services/info-site.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
