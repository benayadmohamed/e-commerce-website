import {Component, Input, OnInit} from '@angular/core';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../models/categorie';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() public loggedIn: boolean;
  categories: Categorie[];

  constructor(private categorieService: CategorieService) {
  }

  ngOnInit() {
    this.categorieService.get().subscribe(value => {
      this.categories = value;
    }, error1 => console.log(error1));
  }

}
