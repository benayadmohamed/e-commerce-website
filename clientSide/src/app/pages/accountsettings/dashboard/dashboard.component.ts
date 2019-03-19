import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../../../services/user-services.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User = new User();

  constructor(private userServicesService: UserServicesService) {
  }

  ngOnInit() {
    this.userServicesService.user.subscribe(value => {
      this.user = value;
    });
  }

}
