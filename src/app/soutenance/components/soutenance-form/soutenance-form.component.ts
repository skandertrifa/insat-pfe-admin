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
import { ToastrService } from 'ngx-toastr';
import { SoutenanceValidation } from '../../enums/soutenance-validation.enum';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

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
    private router: Router,
    private toastrService: ToastrService) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){

      if (object[feature] ===null || object[feature] ===undefined )
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

  validateForm(soutenance) : SoutenanceValidation{

    if(soutenance.dateDePassage<=this.selectedSession.dateDebut  ||
        soutenance.dateDePassage>=this.selectedSession.dateFin)
        return SoutenanceValidation.DateDePassageError

    return SoutenanceValidation.valid

  }

  validation(fromState : SoutenanceValidation) : boolean {
    if (fromState ===SoutenanceValidation.DateDePassageError  )
    {
      this.toastrService.error("Vérifier la date de passage de la soutenance par rapport à la session");
      return false
    }

    return true

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
  createSoutenance() : boolean{

    if (!this.checkExistance(this.getSoutenanceForm())){
      this.toastrService.error("Veuillez Entrer tous les champs");
      return false;
    }

    const validForm =this.validateForm(this.soutenance)
    if(!this.validation(validForm))
      return false;
    console.log(this.getSoutenanceForm())
    let check=false
    this.soutenanceService.createSoutenance(this.getSoutenanceForm()).subscribe(
      (response) =>{
        check=true;
        this.toastrService.success("La soutenance est Crée avec succès");
        this.navigate("../")


      },
      (erreur) => {
        check=false
        this.toastrService.error("Erreur");


      }
    )
    return check
  }

  modifySoutenance() : boolean{

    const modifySoutenance :Partial<CreateSoutenance>={}
    for (let feature in this.getSoutenanceForm())
    {
      if (feature !== null)
        modifySoutenance[feature]=this.soutenance[feature]

    }
    const validForm =this.validateForm(this.soutenance)
    if(!this.validation(validForm))
      return false;

    this.soutenanceService.modifySoutenance(modifySoutenance,this.id).subscribe(
      (response) =>{
        this.toastrService.success("La soutenance est Modifiée avec succès");
        this.navigate("../../")
        return true
      },
      (erreur) => {
        this.toastrService.error("Erreur");
        return false
      }
    )
    return true
  }

  deleteSoutenance() : boolean{

    this.soutenanceService.deleteSoutenance(this.id).subscribe(
      (response) =>{
        this.toastrService.success("La soutenance est Supprimée avec succès");
        return true
      },
      (erreur) => {
        this.toastrService.error("Erreur");
        return false
      }
    )
    return true
  }
  navigate(relativeUrl : string){
    this.router.navigate([relativeUrl],{relativeTo: this.route})
  }
  submit(){
    if (this.role === "creer" ){
      this.createSoutenance()

    }
    else if (this.role === "modifier" ){

      this.modifySoutenance()

    }
  }





}
