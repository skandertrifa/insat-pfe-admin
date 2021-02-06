import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
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

  students: Student[];
  searchString= "";
  modalAddStudentManually = false;
  modalAddStudentExcel = false;
  modalUpdateStudentManually = false;
  tableIndexPage;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedLimit = params.limit;
      this.getStudentsPaginated(+params.page,+params.limit);
    }
    );}
    // handleClick ajouter etudiant manuellement
    handleAddStudentManually(): void{
      this.modalAddStudentManually = !this.modalAddStudentManually;
    }
    // handleClick ajouter etudiant avec excel
    handleAddStudentExcel(): void{
      this.modalAddStudentExcel = !this.modalAddStudentExcel;
    }
    handleUpdateStudentManually(): void{
        this.modalUpdateStudentManually = !this.modalUpdateStudentManually;
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
    getStudentsPaginated(page: number,limit: number){
      this.studentService.getStudentsPaginated(page,limit).subscribe(
        (response) => {
          this.students = response.items;
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
          this.startItem = (page - 1) * this.selectedLimit + 1;
          // end item
          this.endItem = page * this.selectedLimit > this.totalItems ?
            this.totalItems:
            page * this.selectedLimit;
      }
      );
    }
    handleDeleteStudent(id: number): void{
      const dialogRef = this.dialog.open(DeleteStudentComponent, {

        width: '600px',
        panelClass: 'custom-dialog-container',
        data: id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getStudentsPaginated(1, 10) ;
      });
      // console.log(id);
      // this.studentService.deleteStudent(id).subscribe(
      //   (response) => {
      //     this.route.queryParams.subscribe((params) => {
      //       this.selectedLimit = params.limit;
      //       this.getStudentsPaginated(+params.page,+params.limit);
      //     }
      //     );}
      // );
    }
    addStudentManuallyForm(addStudentManually: NgForm):void{
      this.studentService.addStudentManually(addStudentManually.value).subscribe(
        (response) => {
          this.toastrService.success("l'ajout de l'étudiant a été effectué avec succeès :)");
          this.route.queryParams.subscribe((params) => {
            this.selectedLimit = params.limit;
            this.getStudentsPaginated(+params.page,+params.limit);
          });
          this.handleAddStudentManually();
        },
        (erreur) => {
          this.toastrService.error("Echec de l'ajout de l'étudiant");
        }
        );

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

      this.studentService.addStudentsFromExcel(fd).subscribe(
        (response) => {
          //this.toas
          this.toastrService.success('Opération effectué avec succès!');
          this.route.queryParams.subscribe((params) => {
            this.selectedLimit = params.limit;
            this.getStudentsPaginated(+params.page,+params.limit);
          });
          this.handleAddStudentExcel();
        },
        (erreur) => {
          this.toastrService.error("Echec de l'opération :( ");
        }
      )

    }

    updateStudentManuallyForm(updateStudentManually): void{
      this.studentService.updateStudent(updateStudentManually.value).subscribe(
        (response) => {
          this.toastrService.success("la modification de l'étudiant a été effectué avec succeès :)");
          this.route.queryParams.subscribe((params) => {
            this.selectedLimit = params.limit;
            this.getStudentsPaginated(+params.page,+params.limit);
          });
          this.handleUpdateStudentManually();
        },
        (erreur) => {
          this.toastrService.error("Echec de la modification de l'étudiant");
        }
        );

    }

    handleUpdateStudentManuallyButton(student): void{
      //const student = this.students.filter( student => student.idEtudiant == studentId)[0];
      //console.log(student);
      //console.log(studentId);
      this.studentUpdate = student;
      this.handleUpdateStudentManually();

    }






}
