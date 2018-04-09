import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  public navMobile: string;

  constructor(
    private authService: AuthService
  ) {
    this.navMobile = 'nav-mobile-admin-none';
  }

  ngOnInit() {
  }

  toggleNavMobile(): void {
    if (this.navMobile === 'nav-mobile-admin-block') {
      this.navMobile = 'nav-mobile-admin-none';
    } else {
      this.navMobile = 'nav-mobile-admin-block';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
