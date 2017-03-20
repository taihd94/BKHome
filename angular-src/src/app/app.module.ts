import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { NgPipesModule} from 'ngx-pipes';
import { UiSwitchModule} from "angular2-ui-switch/src/index";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { IcDatepickerModule } from 'ic-datepicker';
import { TimepickerModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigComponent } from './components/config/config.component'
import { ConfigNavbarComponent } from './components/config/config-navbar/config-navbar.component';

import {ValidateService} from './services/validate.service';
import {UserService} from './services/httpservice/user.service';
import {HouseService} from './services/httpservice/house.service';
import {DeviceService} from './services/httpservice/device.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { DevicesComponent } from './components/config/devices/devices.component';
import { LightingcontrolComponent } from './components/config/devices/lightingcontrol/lightingcontrol.component';
import { SensorModuleComponent } from './components/config/devices/sensor-module/sensor-module.component';
import { RoomComponent } from './components/config/config-home/room/room.component';
import { ConfigHomeComponent } from './components/config/config-home/config-home.component';
import { ScriptsComponent } from './components/config/scripts/scripts.component';
import { RulesComponent } from './components/config/rules/rules.component';


const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'config', component: ConfigComponent, canActivate:[AuthGuard],
    children: [
      {path: 'home', component: ConfigHomeComponent, canActivate:[AuthGuard]},
      {path: 'home/:id', component: ConfigHomeComponent, canActivate:[AuthGuard]},
      {path: 'devices', component: DevicesComponent, canActivate:[AuthGuard]},
      {path: 'scripts', component: ScriptsComponent, canActivate:[AuthGuard]},
      {path: 'rules', component: RulesComponent, canActivate:[AuthGuard]}
    ]
  },
  {path:'devices', component: DevicesComponent, canActivate:[AuthGuard]}
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
    DevicesComponent,
    LightingcontrolComponent,
    SensorModuleComponent,
    RoomComponent,
    ConfigHomeComponent,
    ScriptsComponent,
    RulesComponent
  ],
  imports: [
    UiSwitchModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    NgPipesModule,
    ToastrModule.forRoot(),
    IcDatepickerModule,
    TimepickerModule.forRoot()
  ],
  providers: [
    ValidateService,
    UserService,
    HouseService,
    DeviceService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
