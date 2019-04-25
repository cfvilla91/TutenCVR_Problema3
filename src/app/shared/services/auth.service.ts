import { Injectable } from '@angular/core';
import { BASE_URL } from '../globals';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private END_POINT = BASE_URL + 'user/';

  private isLoggedIn = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  logIn(login: string, password: string) {
    const url = `${this.END_POINT + login}`;
    // En esta parte encriptaría la password de ser necesario
    const httpHeaders = new HttpHeaders(
      {
        'Content-type': 'application/json',
        password,
        app: 'APP_BCK'
      }
    );

    this.http.put(
      url,
      {},
      {
        headers: httpHeaders
      }
    ).subscribe(
      data => {
        this.handleLogin(data);
      },
      error => {
        this.snackBar.open(
          'Credenciales incorrectas',
          '',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['login-form']);
  }

  handleLogin(data: any) {
    const fullName = data.firstName + ' ' + data.lastName;
    const token = data.sessionTokenBck;
    const email = data.email;
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    this.snackBar.open(
      'Sesión iniciada correctamente, bienvenido ' + fullName,
      '',
      {
        duration: 2000,
      }
    );
    this.isLoggedIn = true;
    this.router.navigate(['home']);
  }

  public isAuthenticated(): boolean {
    // Acá se comprobaría la vigencia de la sesión del token retornado al logear,
    // Se asume que el token no expira
    const currentSessionValid = true;
    return currentSessionValid && this.isLoggedIn;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    const isLoginForm = route.routeConfig.path === 'login-form';

    if (isLoggedIn && isLoginForm) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(['/login-form']);
    }

    return isLoggedIn || isLoginForm;
  }
}
