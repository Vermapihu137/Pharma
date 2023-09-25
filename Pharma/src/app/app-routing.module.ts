import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'About',
    component: AboutComponent
  },
  {
    path: 'Contact',
    component: ContactComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
