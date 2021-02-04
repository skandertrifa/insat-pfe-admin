import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AnneeService } from '../../services/annee.service';
import { Component, OnInit } from '@angular/core';
import { Annee } from '../../models/soutenance';
import { CreateAnnee } from '../../models/create-soutenance';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annee',
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.css']
})
export class AnneeComponent implements OnInit {

  annees : Annee[] = []
  selectedAnnee : Annee
  annee : CreateAnnee={annee : null}
  form : FormGroup
  
  constructor(private anneeService: AnneeService,
              private toastrService: ToastrService) {}
  

  checkExistance(object) : boolean
  {
    for (let feature in object){
      
      if (object[feature] ===null)
        return false
    }
    return true

  }

  loadAnnees(){
    this.anneeService.getAnnees().subscribe(
      (response) => {
        this.annees = response;        
      })
  }


  ngOnInit(): void {
    this.loadAnnees()
  }
  createAnnee(){
    if (!this.checkExistance(this.annee)){
      return ;
    }
    this.anneeService.createAnnee(this.annee).subscribe(
      (response) =>{
        this.loadAnnees()
        this.toastrService.success("L' année est ajoutée avec succès");
      },
      (erreur) =>{
        this.toastrService.error("Veuillez vérifier l'annee entrée");
      }
    )   
  }

  modifyAnnee(){
    console.log("selected : ",this.selectedAnnee)
    const modifyAnnee :Partial<CreateAnnee>={}
    for (let feature in this.annee)
    {
      if (feature !== null)
        modifyAnnee[feature]=this.annee[feature]

    }
    console.log("modifyAnnee : ",modifyAnnee)
    this.anneeService.modifyAnnee(modifyAnnee,this.selectedAnnee.id).subscribe(
      (response) =>{
        this.loadAnnees()
        this.toastrService.success("L' année est modifiée avec succès");
      },
      (erreur) =>{
        this.toastrService.error("Veuillez vérifier l' année entrée");
      }
    )   
  }
  
  deleteAnnee(){
    
    this.anneeService.deleteAnnee(this.selectedAnnee.id).subscribe(
      (response) =>{
        this.loadAnnees()
        this.toastrService.success("L' année est Supprimée avec succès");
      },
      (erreur) =>{
        this.toastrService.error("Erreur de suppression");
      }
    )   
  }


}
