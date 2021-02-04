import { CreerSujetComponent } from './components/creer-sujet/creer-sujet.component';
import { ModifierSujetComponent } from './components/modifier-sujet/modifier-sujet.component';
import { SujetComponent } from './sujet.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AfficherSujetComponent } from './components/afficher-sujet/afficher-sujet.component';



const routes: Routes = [
  {
    path : "",
    component : SujetComponent,
    children : [
      {
        path: '',
        component: AfficherSujetComponent,
      },
      {
        path: 'modifier/:id',
        component: ModifierSujetComponent,
      },
      {
        path: 'creer',
        component: CreerSujetComponent,
      },
    ]
  }

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SujetRoutingModule {
}
