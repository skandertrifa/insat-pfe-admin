import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  searchString= "";
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      (response) => {
        console.log(response);
        this.students = response;
        console.log(this.students);
      }
    );
    //console.log(this.students);


  }

}
