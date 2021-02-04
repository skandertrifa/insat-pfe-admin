import { HttpClientModule } from '@angular/common/http';
import { SoutenanceRoutingModule } from './soutenance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierSoutenanceComponent } from './components/modifier-soutenance/modifier-soutenance.component';
import { CreerSoutenanceComponent } from './components/creer-soutenance/creer-soutenance.component';
import { AfficherSoutenancesComponent } from './components/afficher-soutenances/afficher-soutenances.component';
import { SoutenanceComponent } from './soutenance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AnneeComponent } from './components/annee/annee.component';
import { SessionComponent } from './components/session/session.component';
import { SalleComponent } from './components/salle/salle.component';
import { JuryComponent } from './components/jury/jury.component';
import { SujetComponent } from './components/sujet/sujet.component';
import { SoutenanceFormComponent } from './components/soutenance-form/soutenance-form.component';



@NgModule({
  declarations: [
    SoutenanceComponent,
    ModifierSoutenanceComponent,
    CreerSoutenanceComponent,
    AfficherSoutenancesComponent,
    AnneeComponent,
    SessionComponent,
    SalleComponent,
    JuryComponent,
    SujetComponent,
    SoutenanceFormComponent
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    ToastrModule.forRoot(), // ToastrModule added
    FontAwesomeModule,
    Ng2SearchPipeModule,
    NgbModule,
    FlatpickrModule.forRoot(),

    SoutenanceRoutingModule,
    
  ],
  
})
export class SoutenanceModule { }
