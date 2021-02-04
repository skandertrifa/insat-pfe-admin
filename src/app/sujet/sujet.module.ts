import { SujetRoutingModule } from './sujet-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreerSujetComponent } from './components/creer-sujet/creer-sujet.component';
import { AfficherSujetComponent } from './components/afficher-sujet/afficher-sujet.component';
import { ModifierSujetComponent } from './components/modifier-sujet/modifier-sujet.component';
import { SujetComponent } from './sujet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';




@NgModule({
  declarations: [SujetComponent, CreerSujetComponent,
    AfficherSujetComponent, ModifierSujetComponent],
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
    SujetRoutingModule,  ]
})
export class SujetModule { }
