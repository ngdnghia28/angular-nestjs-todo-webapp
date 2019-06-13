import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';

import { HttpModule } from '@angular/http';
import { MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtService } from './services/jwt.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './inceptors/request.interceptor';
import { TodolistComponent } from './todolist/todolist.component';

const appRoutes: Routes = [
  {
    path: '',
    component: UserloginComponent
  },
  {
    path: 'app-mainpage',
    component: MainpageComponent
  },
  {
    path: 'todos',
    component: TodolistComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserloginComponent,
    MainpageComponent,
    TodolistComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule
  ],

  providers: [UserService, ApiService, AuthGuard, JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
