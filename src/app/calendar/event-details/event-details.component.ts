import { event } from './../../models/event';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [DatePipe]
})
export class EventDetailsComponent implements OnInit {

  constructor(dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: event,
    public datepipe: DatePipe) { }

  updateForm: FormGroup;

  public message: string;
  blured = false;
  focused = false;

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      student: new FormControl(this.data.student),
      filiere: new FormControl(this.data.filiere),
      date: new FormControl(this.datepipe.transform(this.data.start, 'yyyy-M-d')),
      startHour: new FormControl(this.datepipe.transform(this.data.start, 'HH:mm')),
      endHour: new FormControl(this.datepipe.transform(this.data.end, 'HH:mm'))
    });
  }

}
