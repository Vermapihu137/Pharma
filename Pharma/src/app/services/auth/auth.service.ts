import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient) { }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  baseServer1 = "https://localhost:44370/api/";
  jwtHelperService = new JwtHelperService();

  registerUser(user:any) {
    return this.http.post(this.baseServer1 + "Authentication/User/Register", {
      Name:user[0],
      Email:user[1],
      PhoneNo:user[2],
      Password:user[3]  
    }, 
    {
      responseType:"text"
    });
}
  loginUser(loginInfo: any ){
    return this.http.post(this.baseServer1 + "Authentication/User/Login" ,{
      PhoneNo:loginInfo[0],
      Password:loginInfo[1]
    },
    {
      responseType: 'text',
    });
  }

  setToken(token: string){

    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }


  loadCurrentUser()
{
  const token = localStorage.getItem("ac(cess_token");
  const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
  const data = userInfo ?
  {
    id: userInfo.id,
    Name: userInfo.Name,
    email: userInfo.email,
    Contact: userInfo.Contact,
  }: null;
  this.currentUser.next(data);

} 

isLoggedin(): boolean{
  return localStorage.getItem("access_token") ? true : false;
}

removeToken(){
  localStorage.removeItem("access token");
}
}