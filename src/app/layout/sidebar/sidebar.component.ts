import { User } from './../../models/user';
import { AuthenticationService } from './../../shared/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.currentUserValue;
    this.authService.currentUser.subscribe((usr) => {
      this.user = usr;
    });
  }

  ngOnInit(): void {
  }

}
