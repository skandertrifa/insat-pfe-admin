import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  private file: File;

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
  tableIndexPage;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
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
          queryParams: { limit: newValue },
          queryParamsHandling: 'merge'
        });
    }
    getStudentsPaginated(page: number,limit: number){
      this.studentService.getStudentsPaginated(page,limit).subscribe(
        (response) => {
          console.log(response);
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
      console.log(id);
      this.studentService.deleteStudent(id).subscribe(
        (response) => {
          this.route.queryParams.subscribe((params) => {
            this.selectedLimit = params.limit;
            this.getStudentsPaginated(+params.page,+params.limit);
          }
          );}
      );
    }
    addStudentManuallyForm(addStudentManually: NgForm):void{
      console.log(addStudentManually.value);
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
          console.log(response);
        }
      )
      //console.log(fd.get('students'));
      //console.log(addStudentsExcel.value);
    }






}
