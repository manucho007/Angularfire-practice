import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
//We call the service
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
      this.auth.signOut();
    }
}
