import { ActivatedRoute, Router } from '@angular/router';
import { Soutenance } from 'src/app/soutenance/models/soutenance';
import { Component, Input, OnInit } from '@angular/core';
import { CreateSoutenance } from '../../models/create-soutenance';
import { Jury, Salle, Session, Sujet } from '../../models/soutenance';
import { JuryService } from '../../services/jury.service';
import { SalleService } from '../../services/salle.service';
import { SessionService } from '../../services/session.service';
import { SoutenanceService } from '../../services/soutenance.service';
import { SujetService } from '../../services/sujet.service';

@Component({
  selector: 'app-soutenance-form',
  templateUrl: './soutenance-form.component.html',
  styleUrls: ['./soutenance-form.component.css']
})
export class SoutenanceFormComponent implements OnInit {
  
  @Input()
  role: string = "creer";

  @Input()
  id?: number ;

  sessions : Session[] = []
  selectedSession : Session
  salles : Salle[] = []
  selectedSalle : Salle
  juries : Jury[] = []
  selectedJury : Jury
  sujets: Sujet [] = []
  selectedSujet: Sujet

  soutenance : CreateSoutenance={titre : null,
                           dateDePassage:null,
                           sessionId:null,
                           salleId:null,
                           juryId:null,
                           sujetId:null}

  constructor(
    private soutenanceService: SoutenanceService,
    private sessionService: SessionService,
    private salleService: SalleService,
    private juryService: JuryService,
    private sujetService: SujetService,
    private route : ActivatedRoute,
    private router: Router) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){
      
      if (object[feature] ===null)
        return false
    }
    return true

  }
  loadSoutenanceById(){
    this.soutenanceService.getSoutenance(this.id).subscribe(
      (response) => {
        this.soutenance.titre = response.titre;        
        this.soutenance.dateDePassage = response.dateDePassage;

        for(let session of this.sessions){
          if (response.session.id===session.id)
           this.selectedSession = session;
        }

        for(let salle of this.salles){
          if (response.salle.id===salle.id)
           this.selectedSalle = salle;
        }

        for(let jury of this.juries){
          if (response.jury.id===jury.id)
           this.selectedJury = jury;
        }
      
        for(let sujet of this.sujets){
          if (response.sujet.id===sujet.id)
          this.selectedSujet = sujet;
        }
        console.log("soutenance by ID : ",response)

      })
  }

  loadSessions(){
    this.sessionService.getSessions().subscribe(
      (response) => {
        this.sessions = response;        
      })
  }

  loadSalles(){
    this.salleService.getSalles().subscribe(
      (response) => {
        this.salles = response;        
      })
  }
  loadJuries(){
    this.juryService.getJuries().subscribe(
      (response) => {
        this.juries = response;        
      })
  }
  loadSujets(){
    this.sujetService.getSujets().subscribe(
      (response) => {
        this.sujets = response.items;        
      })
  }


  ngOnInit(): void {
    
    this.loadSessions()
    this.loadSalles()
    this.loadJuries()
    this.loadSujets()
    if (this.role==="modifier")
    {
      this.loadSoutenanceById()
    }
  }
  getSoutenanceForm(){
    this.soutenance["sessionId"]=this.selectedSession?.id
    this.soutenance["salleId"]=this.selectedSalle?.id
    this.soutenance["juryId"]=this.selectedJury?.id
    this.soutenance["sujetId"]=this.selectedSujet?.id
    return this.soutenance
  }
  createSoutenance(){

    if (!this.checkExistance(this.getSoutenanceForm())){
      return ;
    }
    this.soutenanceService.createSoutenance(this.getSoutenanceForm()).subscribe(
      (response) =>{
        console.log(response)
      }
    )   
  }

  modifySoutenance(){
    
    const modifySoutenance :Partial<CreateSoutenance>={}
    for (let feature in this.getSoutenanceForm())
    {
      if (feature !== null)
        modifySoutenance[feature]=this.soutenance[feature]

    }
    
    this.soutenanceService.modifySoutenance(modifySoutenance,this.id).subscribe(
      (response) =>{
        console.log(response)
      }
    )   
  }
  
  deleteSoutenance(){
    
    this.soutenanceService.deleteSoutenance(this.id).subscribe(
      (response) =>{
        return true
      }
    )   
  }
  navigate(relativeUrl : string){
    this.router.navigate([relativeUrl],{relativeTo: this.route})
  }
  submit(){
    if (this.role === "creer" ){
      this.createSoutenance()
      this.navigate("../")
    }
    else if (this.role === "modifier" ){
      this.modifySoutenance()
      this.navigate("../../")
    }
  }
  

  


}
