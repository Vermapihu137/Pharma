import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    
  }
  logOut(){
    this.authService.removeToken();
  }

}