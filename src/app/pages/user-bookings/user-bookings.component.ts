import { Component, OnInit, ViewChild } from '@angular/core';
import { UrsersService } from '../../shared/services/users.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userBookingsList: MatTableDataSource<any>;
  columnsToDisplay = [
    'bookingId',
    'fullName',
    'bookingTime',
    'streetAddress',
    'bookingPrice',
  ];

  constructor(private usersService: UrsersService) { }

  ngOnInit() {
    this.usersService.getBookingsByUserEmail('contacto@tutem.cl').subscribe(
      data => {
        this.userBookingsList = new MatTableDataSource(data);
        this.userBookingsList.paginator = this.paginator;
        this.userBookingsList.sort = this.sort;
      }
    );
  }

  JSONParse(json: string) {
    return JSON.parse(json);
  }

  applyFilter(filterValue: string) {
    this.userBookingsList.filter = filterValue.trim().toLowerCase();
  }

}
