import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { MainComponent } from './main/main.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SkyconsModule } from 'ngx-skycons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Error404NotFoundComponent } from './error404-not-found/error404-not-found.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { StudentSearchPipe } from './pipes/student-search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    LeftSideBarComponent,
    MainComponent,
    DashbordComponent,
    Error404NotFoundComponent,
    HeaderComponent,
    LoginComponent,
    StudentsComponent,
    StudentSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    FontAwesomeModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
