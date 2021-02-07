import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';
import { EnseignantService } from './../services/enseignant.service';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { Enseignant } from './../models/enseignant';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../models/student';
import { MatDialog } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  private file: File;

  studentUpdate: Student;

  selectedLimit: number;
  startItem : number;
  endItem : number;

  nextPage = "";
  previousPage = "";
  firstPage = "";
  lastPage = "";

  totalItems :number;
  itemCount :number;
  itemsPerPage :number;
  totalPages :number;
  currentPage :number;

  teachers: Enseignant[];
  searchString= "";
  modalAddStudentManually = false;
  modalAddStudentExcel = false;
  modalUpdateStudentManually = false;
  tableIndexPage;
  constructor(
    private teacherService: EnseignantService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: NgDialogAnimationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedLimit = params.limit;
      this.getTeachersPaginated(+params.page,+params.limit);
    }
    );}
    // handleClick ajouter etudiant manuellement
    handleAddStudentManually(limit): void{
      const dialogRef = this.dialog.open(AddTeacherComponent, {
        animation: { to: "bottom" },
        width: '600px',
        panelClass: 'custom-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getTeachersPaginated(1, limit) ;
      });
    }
    // handleClick ajouter etudiant avec excel
    handleAddStudentExcel(): void{
      this.modalAddStudentExcel = !this.modalAddStudentExcel;
    }
    check = (event: any,x: number) => {
     if (this.currentPage === x) {
       event.preventDefault();
     }
    }
    checkNextPage = (event: any) => {
     if (this.nextPage === "") {
       event.preventDefault();
     }
    }
    checkPreviousPage = (event: any) => {
      if (this.previousPage === "") {
        event.preventDefault();
      }
     }
    onChange(newValue: any){
      //this.selectedLimit = newValue;
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { limit: newValue, page: '1' },
          queryParamsHandling: 'merge'
        });
    }
    getTeachersPaginated(page: number,limit: number){
      this.teacherService.getTeachersPaginated(page,limit).subscribe(
        (response) => {
          console.log(response);
          this.teachers = response.items;
          //links
          this.firstPage = response.links.first;
          this.lastPage = response.links.last;
          this.nextPage = response.links.next;
          this.previousPage = response.links.previous;
          //meta
          this.totalItems = response.meta.totalItems;
          this.itemCount = response.meta.itemCount;
          this.itemsPerPage = response.meta.itemsPerPage;
          this.totalPages = response.meta.totalPages;
          this.tableIndexPage = new Array(this.totalPages);
          this.currentPage = response.meta.currentPage;
          // start item:
          this.startItem = this.totalItems? (page - 1) * this.selectedLimit + 1:0;
          // end item
          this.endItem = page * this.selectedLimit > this.totalItems ?
            this.totalItems:
            page * this.selectedLimit;
      }
      );
    }
    handleDeleteStudent(id: number, page: number, limit: number): void{
      const dialogRef = this.dialog.open(DeleteTeacherComponent, {
        animation: { to: "left" },
        width: '600px',
        panelClass: 'custom-dialog-container',
        data: id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getTeachersPaginated(page, limit) ;
      });
    }

    onFileChange(fileChangeEvent) {
      this.file = fileChangeEvent.target.files[0];
    }
    addStudentsExcelForm(addStudentsExcel: NgForm):void{
      let fd = new FormData();
      //this.file, this.file.name
      fd.append('students',this.file,this.file.name);
      fd.append('nom',addStudentsExcel.value.nom);
      fd.append('prenom',addStudentsExcel.value.prenom);
      fd.append('email',addStudentsExcel.value.email);
      fd.append('filiere',addStudentsExcel.value.filiere);
      fd.append('cin',addStudentsExcel.value.cin);
      fd.append('idEtudiant',addStudentsExcel.value.idEtudiant);
      //console.log(fd.get('students'));

      this.teacherService.addTeachersFromExcel(fd).subscribe(
        (response) => {
          //this.toas
          console.log(response);
          this.toastrService.success('Opération effectué avec succès!');
          this.route.queryParams.subscribe((params) => {
            this.selectedLimit = params.limit;
            this.getTeachersPaginated(+params.page,+params.limit);
          });
          this.handleAddStudentExcel();
        },
        (erreur) => {
          this.toastrService.error("Echec de l'opération :( ");
        }
      )

    }

    handleUpdateStudentManuallyButton(teacher, page, limit): void{
      const dialogRef = this.dialog.open(EditTeacherComponent, {
        animation: { to: "bottom" },
        width: '600px',
        panelClass: 'custom-dialog-container',
        data: teacher
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getTeachersPaginated(page, limit) ;
      });
    }






}
