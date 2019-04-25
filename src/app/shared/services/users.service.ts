import { Injectable } from '@angular/core';
import { BASE_URL } from '../globals';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrsersService {

  private END_POINT = BASE_URL + 'user/';

  constructor(
    private http: HttpClient,
  ) { }

  getBookingsByUserEmail(email: string): Observable<any[]> {
    const url = `${this.END_POINT + email}/bookings?current=true`;
    const token = localStorage.getItem('token');
    const adminEmail = localStorage.getItem('email');
    const httpHeaders = new HttpHeaders(
      {
        'Content-type': 'application/json',
        adminEmail,
        token,
        app: 'APP_BCK'
      }
    );

    return this.http.get<any[]>(
      url,
      {
        headers: httpHeaders
      }
    );
  }

}
