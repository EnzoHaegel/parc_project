import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard, CanActivateRouteGuardAdmin } from './can-activate-route.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LogsComponent } from './pages/logs/logs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'logs', component: LogsComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent, canActivate: [CanActivateRouteGuard], pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
