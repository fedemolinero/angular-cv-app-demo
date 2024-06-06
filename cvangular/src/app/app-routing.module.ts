import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataWrapperComponent } from './data-wrapper/data-wrapper.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', component: DataWrapperComponent,
    canActivate: [authGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
