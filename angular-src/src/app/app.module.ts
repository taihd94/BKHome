import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import {NgPipesModule} from 'ngx-pipes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigComponent } from './components/config/config.component'

import {ValidateService} from './services/validate.service';
import {UserService} from './services/httpservice/user.service';
import {HouseService} from './services/httpservice/house.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { ConfigNavbarComponent } from './components/config/config-navbar/config-navbar.component';
import { Configv2Component } from './components/configv2/configv2.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'config', component: ConfigComponent, canActivate:[AuthGuard]},
  {path:'config2', component: Configv2Component, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ConfigComponent,
    ConfigNavbarComponent,
    Configv2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    NgPipesModule
  ],
  providers: [
    ValidateService,
    UserService,
    HouseService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
