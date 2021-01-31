import { Component, OnInit } from '@angular/core';
import { CreateSalle } from '../../models/create-soutenance';
import { Salle } from '../../models/soutenance';
import { SalleService } from '../../services/salle.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  salles : Salle[] = []
  selectedSalle : Salle
  salle : CreateSalle={code : null}

  constructor(private salleService: SalleService) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){
      
      if (object[feature] ===null)
        return false
    }
    return true

  }

  loadsalles(){
    this.salleService.getSalles().subscribe(
      (response) => {
        this.salles = response;        
      })
  }


  ngOnInit(): void {
    this.loadsalles()
  }
  createSalle(){
    if (!this.checkExistance(this.salle)){
      return ;
    }
    this.salleService.createSalle(this.salle).subscribe(
      (response) =>{
        this.loadsalles()
      }
    )   
  }

  modifySalle(){
    console.log("selected : ",this.selectedSalle)
    const modifySalle :Partial<CreateSalle>={}
    for (let feature in this.salle)
    {
      if (feature !== null)
        modifySalle[feature]=this.salle[feature]

    }
    console.log("modifysalle : ",modifySalle)
    this.salleService.modifySalle(modifySalle,this.selectedSalle.id).subscribe(
      (response) =>{
        this.loadsalles()
      }
    )   
  }
  
  deleteSalle(){
    
    this.salleService.deleteSalle(this.selectedSalle.id).subscribe(
      (response) =>{
        this.loadsalles()
      }
    )   
  }


}

