import { ToastrService } from 'ngx-toastr';
import { EnseignantService } from './../../services/enseignant.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.css']
})
export class DeleteTeacherComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<DeleteTeacherComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: number,
    private teacherService: EnseignantService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.teacherService.deleteEnseignant(this.data).subscribe(
      res => {
        this.matDialogRef.close();
        this.toastrService.success("Enseignant supprimé avec succées!");
      },
      err => {
        this.toastrService.error("Echec de suppression de l'enseignant");
      }
    );
  }
}
