import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentService.getStudentsPaginated(+params.page,+params.limit).subscribe(
        (response) => {
          console.log(response.items);
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

      }
    );}
    );}
    // handleClick ajouter etudiant manuellement
    handleAddStudentManually(): void{
      this.modalAddStudentManually = !this.modalAddStudentManually;
    }
    // handleClick ajouter etudiant avec excel
    handleAddStudentExcel(): void{
      this.modalAddStudentExcel = !this.modalAddStudentExcel;
    }
    check = (event,x: number) => {
     if (this.currentPage === x) {
       event.preventDefault();
     }
    }





}
