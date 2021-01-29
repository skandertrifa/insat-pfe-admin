import { SoutenanceComponent } from './soutenance.component';
import { ModifierSoutenanceComponent } from './modifier-soutenance/modifier-soutenance.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AfficherSoutenancesComponent } from './afficher-soutenances/afficher-soutenances.component';
import { CreerSoutenanceComponent } from './creer-soutenance/creer-soutenance.component';



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
    ]
  }

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoutenanceRoutingModule {
}
