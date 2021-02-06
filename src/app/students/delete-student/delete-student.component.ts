import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<DeleteStudentComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: number,
    private studentService: StudentService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  remove() {
    this.studentService.deleteStudent(this.data).subscribe(
      res => {
        this.matDialogRef.close();
        this.toastrService.success("Elève supprimé avec succées!");
      },
      err => {
        this.toastrService.error("Echec de suppression de le l'élève");
      }
    );
  }

}
