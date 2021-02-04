import { Component, OnInit } from '@angular/core';
import { Sujets } from 'src/app/sujet/model/sujet';
import { SujetService } from '../../services/sujet.service';

@Component({
  selector: 'app-afficher-sujet',
  templateUrl: './afficher-sujet.component.html',
  styleUrls: ['./afficher-sujet.component.css']
})
export class AfficherSujetComponent implements OnInit {

  sujets: Sujets=null;
  searchString : string = "";
  page: number=1
  constructor(
    private sujetService: SujetService
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
    this.sujetService.deleteSujet(+id).subscribe((response)=>{})
    let index = null
    for(let i=0;i<this.sujets.items.length;i++){
      if (this.sujets.items[i].id == id)
      {index = i}
    }
    this.sujets.items.splice(index,1)
  }

}
