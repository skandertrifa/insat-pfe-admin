import { Component, OnInit } from '@angular/core';
import { CreateSession } from '../../models/create-soutenance';
import { Annee, Session } from '../../models/soutenance';
import { AnneeService } from '../../services/annee.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  annees : Annee[] = []
  selectedAnnee : Annee
  sessions : Session[] = []
  selectedSession : Session
  session : CreateSession={name : null,
                           dateDebut:null,
                           dateFin:null,
                           anneeId:null}

  constructor(
    private sessionService: SessionService,
    private anneeService: AnneeService) { }

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

  loadSessions(){
    this.sessionService.getSessions().subscribe(
      (response) => {
        this.sessions = response;        
      })
  }


  ngOnInit(): void {
    this.loadAnnees()
    this.loadSessions()
  }
  getSessionForm(){
    this.session["anneeId"]=this.selectedAnnee.id
    return this.session
  }
  createSession(){
    if (!this.checkExistance(this.session)){
      return ;
    }
    this.sessionService.createSession(this.getSessionForm()).subscribe(
      (response) =>{
        this.loadSessions()
      }
    )   
  }

  modifySession(){
    
    const modifySession :Partial<CreateSession>={}
    for (let feature in this.session)
    {
      if (feature !== null)
        modifySession[feature]=this.session[feature]

    }
    if (this.selectedAnnee)
      modifySession.anneeId=this.selectedAnnee.id
    console.log("modifySession : ",modifySession)
    this.sessionService.modifySession(modifySession,this.selectedSession.id).subscribe(
      (response) =>{
        this.loadSessions()
      }
    )   
  }
  
  deleteSession(){
    
    this.sessionService.deleteSession(this.selectedSession.id).subscribe(
      (response) =>{
        this.loadSessions()
      }
    )   
  }
  

  updateForm(){
    this.session["dateDebut"]=this.selectedSession.dateDebut
    this.session["dateFin"]=this.selectedSession.dateFin
    this.session["name"]=this.selectedSession.name
    this.session["anneeId"]=this.selectedSession.annee.id
    
    
    for(let annee of this.annees){
      if (annee.id===this.selectedSession.annee.id){
        this.selectedAnnee=annee
        break;
      }

    }
    console.log("selected session : ",this.selectedSession)
    console.log("session : ",this.session)
    console.log("update selected annee : ",this.selectedAnnee)
    
    
  }
  compareAnnee(c1: Annee, c2:number): boolean {  
    console.log("c1 : ",c1)   
    console.log("c2 : ",c2)
    return c1.id === c2 
}


}

