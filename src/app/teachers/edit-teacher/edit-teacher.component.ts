import { ToastrService } from 'ngx-toastr';
import { EnseignantService } from './../../services/enseignant.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Enseignant } from 'src/app/models/enseignant';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<EditTeacherComponent>,
    public dialog: MatDialog,
    private teacherService: EnseignantService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Enseignant
  ) { }

  updateForm: FormGroup;

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      nom: new FormControl(this.data.userDetails.nom, Validators.required),
      prenom: new FormControl(this.data.userDetails.prenom, Validators.required),
      email: new FormControl(this.data.userDetails.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
  }

  update() {
    console.log(this.data);
    this.teacherService.putEnseignant(this.updateForm.value, this.data.id).subscribe(
      res => {
        this.matDialogRef.close();
        this.toastrService.success("Enseignant modifié avec succées!");
      },
      err => {
        this.toastrService.error("Echec de la modification de l'étudiant");
      }
    );
  }


}
