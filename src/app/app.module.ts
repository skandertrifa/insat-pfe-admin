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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Error404NotFoundComponent } from './error404-not-found/error404-not-found.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { StudentSearchPipe } from './pipes/student-search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import { SoutenanceModule } from './soutenance/soutenance.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EventDetailsComponent } from './calendar/event-details/event-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeacherComponent } from './teachers/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './teachers/edit-teacher/edit-teacher.component';
import { DeleteTeacherComponent } from './teachers/delete-teacher/delete-teacher.component';
import { DeleteStudentComponent } from './students/delete-student/delete-student.component';


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
    StudentSearchPipe,
    CalendarComponent,
    EventDetailsComponent,
    TeachersComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    DeleteTeacherComponent,
    DeleteStudentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    FontAwesomeModule,
    Ng2SearchPipeModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    FlatpickrModule.forRoot(),
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    SoutenanceModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
