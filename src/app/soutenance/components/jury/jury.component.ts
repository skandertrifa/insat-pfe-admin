import { Enseignant } from './../../../models/enseignant';
import { EnseignantService } from './../../../services/enseignant.service';
import { Component, OnInit } from '@angular/core';
import { CreateJury } from '../../models/create-soutenance';
import { Jury } from '../../models/soutenance';
import { JuryService } from '../../services/jury.service';
import { ToastrService } from 'ngx-toastr';
import { JuryValidation } from '../../enums/jury-validation.enum';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {
  enseignants : Enseignant[] = []
  selectedPresident : Enseignant=null
  selectedMembers : Enseignant[] = [null,null]
  juries : Jury[] = []
  selectedJury : Jury
  jury : CreateJury={president : null,
                           members:[null,null],}

  constructor(
    private juryService: JuryService,
    private enseignantService : EnseignantService,
    private toastrService: ToastrService) { }

  checkExistance(object) : boolean
  {
    
    if (object["president"] ===null)
      return false
    if (object["members"][0] ===null)
      return false
      
    if (object["members"][1] ===null)
      return false
    
    return true

  }
  
  loadJuries(){
    this.juryService.getJuries().subscribe(
      (response) => {
        this.juries = response;        
      })
  }
  loadEnseignants(){
    this.enseignantService.getEnseignants().subscribe(
      (response) => {
        this.enseignants = response;        
      })
  }


  ngOnInit(): void {
    
    this.loadJuries()
    this.loadEnseignants()
  }

  validateForm(jury) : JuryValidation{

    if(jury.president===jury.members[0] ||
      jury.president===jury.members[1] ||
      jury.members[1]===jury.members[0])
        return JuryValidation.DuplicateError 
    
    return JuryValidation.valid

  }

  validation(fromState : JuryValidation) : boolean {
    if (fromState ===JuryValidation.DuplicateError )
    {
      this.toastrService.error("Les membres de la jury doivent etre unique");
      return false
    }

    return true

  }

  getJuryForm(){
    if(this.selectedPresident!=null && this.selectedPresident!=undefined )
      this.jury["president"]=this.selectedPresident.id
    if(this.selectedMembers[0]!=null && this.selectedMembers[0]!=undefined )
      this.jury["members"][0]=this.selectedMembers[0]?.id
    if(this.selectedMembers[1]!=null && this.selectedMembers[1]!=undefined )
      this.jury["members"][1]=this.selectedMembers[1]?.id
    return this.jury
  }
  createJury(){
    this.jury=this.getJuryForm()
    if (!this.checkExistance(this.jury)){
      this.toastrService.error("Veuillez remplir tous les champs");
      return ;
    }
    
    const validForm =this.validateForm(this.jury)
    if(!this.validation(validForm))
      return ;

    this.juryService.createJury(this.getJuryForm()).subscribe(
      (response) =>{
        this.loadJuries()
        this.toastrService.success("La jury est Crée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
      }
    )   
  }

  modifyJury(){
    
    const modifyJury :Partial<CreateJury>={}
    for (let feature in this.jury)
    {
      if (feature !== null)
        modifyJury[feature]=this.jury[feature]

    }
    if (this.selectedPresident)
      modifyJury.president=this.selectedPresident.id
    if (this.selectedMembers[0])
      modifyJury.members[0]=this.selectedMembers[0].id

    if (this.selectedMembers[1])
      modifyJury.members[1]=this.selectedMembers[1].id

    const validForm =this.validateForm(modifyJury)
    if(!this.validation(validForm))
        return ;

    this.juryService.modifyJury(modifyJury,this.selectedJury.id).subscribe(
      (response) =>{
        this.loadJuries()
        this.toastrService.success("La jury est Modifiée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
      }
    )   
  }
  
  deleteJury(){
    
    this.juryService.deleteJury(this.selectedJury.id).subscribe(
      (response) =>{
        this.loadJuries()
        this.toastrService.success("La jury est Supprimée avec succès");
      },
      (erreur) => {
        this.toastrService.error("Erreur");
      }
    )   
  }
  

  updateForm(){
    this.jury["president"]=this.selectedJury.president.id
    this.jury["members"][0]=this.selectedJury.members[0].id
    this.jury["members"][1]=this.selectedJury.members[1].id
    
    for(let enseignant of this.enseignants){
      if (enseignant.id===this.selectedJury.president.id){
        this.selectedPresident=enseignant
      }
      if (enseignant.id===this.selectedJury.members[0].id){
        this.selectedMembers[0]=enseignant
      }
      if (enseignant.id===this.selectedJury.members[1].id){
        this.selectedMembers[1]=enseignant
      }
    

    }
    
    
    
    
    
    
  }
  
  


}

