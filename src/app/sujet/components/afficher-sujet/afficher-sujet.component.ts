import { Sujet } from './../../model/sujet';
import { Component, OnInit } from '@angular/core';
import { Sujets } from 'src/app/sujet/model/sujet';
import { SujetService } from '../../services/sujet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css']
})
export class AfficherSujetComponent implements OnInit {

  sujets: Sujets=null;
  searchString : string = "";
  page: number=1
  sujetUpdate : Sujet;
  modalUpdateSujet =false;
  route: any;
  constructor(
    private sujetService: SujetService,
    private toastrService: ToastrService

  ) { }


  ngOnInit() {
    this.sujetService.getSujets(this.page).subscribe(
      (response) => {
        this.sujets = response;
      })
  }


  setPage(page: number=1){
    this.page=page
    this.sujetService.getSujets(this.page).subscribe(
      (response) => {
        this.sujets = response;
      })

  }

  handleDownloadRapportPfe(rapportID:number,filename:string){
    this.sujetService.downloadRapport(rapportID).subscribe(
      (response)=>{
/*         const url = URL.createObjectURL(new Blob([response.data]));
        window.open(url); */
        this.downloadBlob(new Blob([response.data]),filename)
      }
    );
  }

  downloadBlob(blob, name = 'file.txt') {
    if (
      window.navigator &&
      window.navigator.msSaveOrOpenBlob
    ) return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
}

  handleDeleteSujet(id:number){
    console.log('handle delete sujet')
    this.sujetService.deleteSujet(+id).subscribe((response)=>{
      let index = null
      for(let i=0;i<this.sujets.items.length;i++){
        if (this.sujets.items[i].id == id)
        {index = i}
      }
    this.sujets.items.splice(index,1)
      this.toastrService.success("la Suppression du sujet a été effectué avec succeès :)");
    },
    (erreur) => {
      this.toastrService.error("Echec de la supression du sujet");
    })

  }

  handleUpdateSujetButton(sujet:Sujet){
    this.sujetUpdate = sujet;
    console.log(sujet);
    this.handleUpdateSujet();
  }

  handleUpdateSujet(){
    this.modalUpdateSujet= !this.modalUpdateSujet;
}


updateSujetMethod(updateSujet): void{
  console.log(updateSujet);
  this.sujetService.updateSujet(updateSujet.value,+this.sujetUpdate.id).subscribe(
    (response) => {
      this.toastrService.success("la modification du sujet a été effectué avec succeès :)");
/*       this.route.queryParams.subscribe((params) => {
        //this.getStudentsPaginated(+params.page,+params.limit);
      }); */
      this.setPage(this.page);
      this.handleUpdateSujet();
    },
    (erreur) => {
      this.toastrService.error("Echec de la modification du sujett");
    }
    );

}

}
