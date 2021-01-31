import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
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






}
