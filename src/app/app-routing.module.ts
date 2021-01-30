import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Error404NotFoundComponent } from './error404-not-found/error404-not-found.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
  { path: '', redirectTo: '/Dashbord', pathMatch: 'full'},
  {
    path:'',
    component: MainComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'Dashbord', component: DashbordComponent },
      { path: 'Students', component: StudentsComponent },
      { path: 'Soutenance', loadChildren: () => import('./soutenance/soutenance.module')
      .then(m => m.SoutenanceModule), },
      
      
      { path: 'Calendar', component: CalendarComponent },
    ],
  },
 
  { path:'Login', component: LoginComponent },
  { path:'**', component: Error404NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
