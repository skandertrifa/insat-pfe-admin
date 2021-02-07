import { ToastrService } from 'ngx-toastr';
import { EnseignantService } from './../../services/enseignant.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-teacher-excel',
  templateUrl: './add-teacher-excel.component.html',
  styleUrls: ['./add-teacher-excel.component.css']
})
export class AddTeacherExcelComponent implements OnInit {
  private file: File;

  constructor(
    public matDialogRef: MatDialogRef<AddTeacherExcelComponent>,
    public dialog: MatDialog,
    private teacherService: EnseignantService,
    private toastrService: ToastrService
  ) { }

  addForm: FormGroup;

  ngOnInit(): void {
    this.addForm = new FormGroup({
      nom: new FormControl(null, Validators.required),
      prenom: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  add() {
    let fd = new FormData();
      //this.file, this.file.name
      fd.append('teachers',this.file,this.file.name);
      fd.append('nom',this.addForm.value.nom);
      fd.append('prenom',this.addForm.value.prenom);
      fd.append('email',this.addForm.value.email);
      //console.log(fd.get('students'));

    this.teacherService.addTeachersFromExcel(fd).subscribe(
      res => {
        this.matDialogRef.close();
        this.toastrService.success("Liste des enseignants ajoutée avec succées!");
      },
      err => {
        this.toastrService.error("Echec de l'ajout de la liste des enseignants");
      }
    );
  }


}
