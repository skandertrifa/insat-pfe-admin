import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreateSession } from '../../models/create-soutenance';
import { Annee, Session } from '../../models/soutenance';
import { AnneeService } from '../../services/annee.service';
import { SessionService } from '../../services/session.service';
import {SessionValidation} from '../../enums/session-validation.enum'
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
    private anneeService: AnneeService,
    private toastrService: ToastrService) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){

      if (object[feature] ===null)
        return false
    }
    return true

  }
  validateForm(session) : SessionValidation{

    if(session.dateDebut>=session.dateFin)
        return SessionValidation.dateRangeError 
    
    return SessionValidation.valid

  }

  validation(fromState : SessionValidation) : boolean {
    if (fromState ===SessionValidation.dateRangeError )
    {
      this.toastrService.error("Vérifier la date de début et de fin de session");
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
    
    if (this.selectedAnnee===null || !this.checkExistance(this.getSessionForm())  ){
      console.log("session : ",this.session)
      this.toastrService.error("Veuillez Entrer tous les champs");
      return ;
    }
    
    const validForm =this.validateForm(this.session)
    if(!this.validation(validForm))
      return ;
  
    this.sessionService.createSession(this.session).subscribe(
      (response) =>{
        this.loadSessions()
        this.toastrService.success("La session est Crée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
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
    
      const validForm =this.validateForm(this.session)
    if(!this.validation(validForm))
      return ;
    this.sessionService.modifySession(modifySession,this.selectedSession.id).subscribe(
      (response) =>{
        this.loadSessions()
        this.toastrService.success("La session est Modifiée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
      }
    )
  }

  deleteSession(){

    this.sessionService.deleteSession(this.selectedSession.id).subscribe(
      (response) =>{
        this.loadSessions()
        this.toastrService.success("La session est Supprimée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
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
  


}

