import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeAnimation } from '../animations/fadeAnimation';
import { AuthService } from '../../shared/services/auth.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [fadeAnimation]
})
export class LayoutComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => this.drawer.close());
  }

  click_logout() {
    this.authService.logOut();
  }

}
