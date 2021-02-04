import { ToastrService } from 'ngx-toastr';
import { EnseignantService } from './../../services/enseignant.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<AddTeacherComponent>,
    public dialog: MatDialog,
    private teacherService: EnseignantService,
    private toastrService: ToastrService
  ) { }

  addForm: FormGroup;

  ngOnInit(): void {
    this.addForm = new FormGroup({
      nom: new FormControl(null, Validators.required),
      prenom: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
  }

  add() {
    this.teacherService.postEnseignant(this.addForm.value).subscribe(
      res => {
        this.matDialogRef.close();
        this.toastrService.success("Enseignant ajouté avec succées!");
      },
      err => {
        this.toastrService.error("Echec de l'ajout de l'étudiant");
      }
    );
  }


}
