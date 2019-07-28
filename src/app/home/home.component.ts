import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchValue: string = "";
  items: Array<any>;

  constructor( 
    public firebaseService: FirebaseService,
    private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.items = result;
    })
  }

  Logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
