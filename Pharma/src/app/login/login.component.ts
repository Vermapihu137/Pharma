import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isUserValid: boolean = false;
  

  constructor(private loginAuth : AuthService, private router: Router) { }
  ngOnInit(): void {
    
  }
  loginForm = new FormGroup({
    PhoneNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });

  loginSubmitted(){
    this.loginAuth.loginUser([this.loginForm.value.PhoneNo?? '', this.loginForm.value.password?? ''])
    .subscribe(res => {
      if(res == 'Failure'){
        this.isUserValid = false;
        alert('Login Unsuccessfull')
      }else {
        this.isUserValid = true;
        this.loginAuth.setToken(res);
        this.router.navigateByUrl('');
      }
    });
  }

  
  
  get PhoneNo() : FormControl{
    return this.loginForm.get("PhoneNo") as FormControl;
  }
  get Password() : FormControl{
    return this.loginForm.get("password") as FormControl;
  }
}