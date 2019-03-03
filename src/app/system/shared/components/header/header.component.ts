import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.userService.getUserName()
      .subscribe((data: any) => this.user = data.fullName);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
