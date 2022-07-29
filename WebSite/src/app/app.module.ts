import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ManageUsersComponent } from './pages/configuration/manage-users/manage-users.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DialogConfirmComponent } from './pages/configuration/manage-users/dialog-confirm/dialog-confirm.component';
import { CustomizeAppComponent } from './pages/configuration/customize-app/customize-app.component';
import { ThemeSelectorComponent } from './pages/configuration/customize-app/theme-selector/theme-selector.component';
import { ManageRoleComponent } from './pages/configuration/manage-role/manage-role.component';
import { UploadPpComponent } from './pages/user/upload-pp/upload-pp.component';

import { CanActivateRouteGuard } from './can-activate-route.guard';
import { authInterceptorProviders } from './helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './pages/dashboard/card/card.component';
import { ChartsModule } from 'ng2-charts';
import { MachinesListComponent } from './pages/dashboard/machines-list/machines-list.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    LogsComponent,
    ConfigurationComponent,
    ManageUsersComponent,
    DialogConfirmComponent,
    ContactComponent,
    CustomizeAppComponent,
    ThemeSelectorComponent,
    ManageRoleComponent,
    UploadPpComponent,
    DashboardComponent,
    CardComponent,
    MachinesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgHttpLoaderModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule,
    FileUploadModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    MatMenuModule,
    ChartsModule,
    MatChipsModule
  ],
  providers: [
    authInterceptorProviders,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
