import { Enseignant } from './../../../models/enseignant';
import { EnseignantService } from './../../../services/enseignant.service';
import { Component, OnInit } from '@angular/core';
import { CreateJury } from '../../models/create-soutenance';
import { Jury } from '../../models/soutenance';
import { JuryService } from '../../services/jury.service';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.css']
})
export class JuryComponent implements OnInit {
  enseignants : Enseignant[] = []
  selectedPresident : Enseignant
  selectedMembers : Enseignant[] = [null,null]
  juries : Jury[] = []
  selectedJury : Jury
  jury : CreateJury={president : null,
                           members:[null,null],}

  constructor(
    private juryService: JuryService,
    private enseignantService : EnseignantService) { }

  checkExistance(object) : boolean
  {
    for (let feature in object){

      if (object[feature] ===null)
        return false
    }
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

  getJuryForm(){
    this.jury["president"]=this.selectedPresident.id
    this.jury["members"][0]=this.selectedMembers[0].id
    this.jury["members"][1]=this.selectedMembers[1].id
    return this.jury
  }
  createJury(){
    this.juryService.createJury(this.getJuryForm()).subscribe(
      (response) =>{
        this.loadJuries()
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

    console.log("modifyJury : ",modifyJury)
    this.juryService.modifyJury(modifyJury,this.selectedJury.id).subscribe(
      (response) =>{
        this.loadJuries()
      }
    )
  }

  deleteJury(){

    this.juryService.deleteJury(this.selectedJury.id).subscribe(
      (response) =>{
        this.loadJuries()
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

    console.log("selected jury : ",this.selectedJury)
    console.log("selected president : ",this.selectedPresident)
    console.log("selected member 0 : ",this.selectedMembers[0])
    console.log("selected member 1 : ",this.selectedMembers[1])




  }




}

