import { SoutenanceRoutingModule } from './soutenance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierSoutenanceComponent } from './modifier-soutenance/modifier-soutenance.component';
import { CreerSoutenanceComponent } from './creer-soutenance/creer-soutenance.component';
import { AfficherSoutenancesComponent } from './afficher-soutenances/afficher-soutenances.component';
import { SoutenanceComponent } from './soutenance.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SoutenanceComponent,
    ModifierSoutenanceComponent,
    CreerSoutenanceComponent,
    AfficherSoutenancesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SoutenanceRoutingModule,
  ],
  
})
export class SoutenanceModule { }
