import { event } from './../../models/event';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [DatePipe]
})
export class EventDetailsComponent implements OnInit, AfterViewInit {

  constructor(dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: event,
    public datepipe: DatePipe) { }

  updateForm: FormGroup;
  jury = "";
  ngOnInit(): void {
    this.data.jury.forEach(teacher => {
      this.jury = this.jury + "• " + teacher.userDetails.nom + " " + teacher.userDetails.prenom + "\n\n"
    });
    this.jury = this.jury.substring(0,this.jury.length-2);
    this.updateForm = new FormGroup({
      student: new FormControl(this.data.student),
      filiere: new FormControl(this.data.filiere),
      date: new FormControl(this.datepipe.transform(this.data.start, 'yyyy-M-d')),
      startHour: new FormControl(this.datepipe.transform(this.data.start, 'HH:mm')),
      endHour: new FormControl(this.datepipe.transform(this.data.end, 'HH:mm')),
      salle: new FormControl(this.data.salle),
      sujet: new FormControl(this.data.sujet.titre + " - " + this.data.sujet.description),
      dateLimiteDepot: new FormControl(this.datepipe.transform(this.data.sujet.dateLimiteDepot, 'yyyy-M-d') + " - " + this.datepipe.transform(this.data.sujet.dateLimiteDepot, 'HH:mm')),
      jury: new FormControl(this.jury)
    });
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
