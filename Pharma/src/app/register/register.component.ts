import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  displayMsg: string = '';
  isAccountCreated: boolean = false;

  constructor(private authservice: AuthService) { }
  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]*"),
    Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });

  RegisterSubmitted() {
    console.log("Submited");
    this.authservice.registerUser([
      this.registerForm.value.Name,
      this.registerForm.value.email,
      this.registerForm.value.PhoneNo,
      this.registerForm.value.password
    ])
      .subscribe(res => {
        if (res == 'User registered successfully.') {
          this.displayMsg = 'Account Created Successfuly!';
          this.isAccountCreated = true;
        } else if (res == 'User already exists.') {
          this.displayMsg = 'Account already exists.';
          this.isAccountCreated = false;
        } else {
          this.displayMsg = 'Something went Wrong.';
          this.isAccountCreated = false;
        }
        console.log(res);
      })
  }
  get Name(): FormControl {
    return this.registerForm.get("Name") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get PhoneNo(): FormControl {
    return this.registerForm.get("PhoneNo") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
}