import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { fadeAnimation } from './@theme/animations/fadeAnimation';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  title = 'tuten_problema3';
  MENU_ITEMS = [
    {
      label: 'Home',
      icon: 'home',
      link: 'home'
    },
    {
      label: 'Informes',
      icon: 'assignment',
      items: [
        {
          label: 'Bookings Usuario',
          link: 'userBookings',
          icon: 'book'
        },
        {
          label: 'Usuarios',
          icon: 'perm_identity',
          onSelected: () => this.enConstruccion()
        }
      ]
    },
    {
      label: 'Dashboard',
      icon: 'dashboard',
      items: [
        {
          label: 'KPIs',
          icon: 'bar_chart',
          onSelected: () => this.enConstruccion()
        }
      ]
    }
  ];

  isAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }

  enConstruccion() {
    this.snackBar.open(
      'En construcción',
      '',
      {
        duration: 2000,
      }
    );
  }

  styleLogin() {
    return {
      background: 'url(assets/img/bg_login.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  }
}
