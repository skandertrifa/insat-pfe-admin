import { SoutenanceComponent } from './soutenance.component';
import { ModifierSoutenanceComponent } from './components/modifier-soutenance/modifier-soutenance.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AfficherSoutenancesComponent } from './components/afficher-soutenances/afficher-soutenances.component';
import { CreerSoutenanceComponent } from './components/creer-soutenance/creer-soutenance.component';
import { AnneeComponent } from './components/annee/annee.component';
import { SessionComponent } from './components/session/session.component';
import { SalleComponent } from './components/salle/salle.component';
import { JuryComponent } from './components/jury/jury.component';



const routes: Routes = [
  {
    path : "",
    component : SoutenanceComponent,
    children : [
      {
        path: '',
        component: AfficherSoutenancesComponent,
      },
      {
        path: 'modifier/:id',
        component: ModifierSoutenanceComponent,
      },
      {
        path: 'creer',
        component: CreerSoutenanceComponent,
      },
      {
        path: 'Annee',
        component: AnneeComponent,
      },
      {
        path: 'Session',
        component: SessionComponent,
      },
      {
        path: 'Salle',
        component: SalleComponent,
      },
      {
        path: 'Jury',
        component: JuryComponent,
      },

    ]
  }

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoutenanceRoutingModule {
}
