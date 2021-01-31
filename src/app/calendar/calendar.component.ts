import { event } from './../models/event';
import { EventDetailsComponent } from './event-details/event-details.component';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();



  events: event[] = [
    {
      id: 1,
      start: new Date('2021-01-22 15:00'),
      end: addHours(new Date('2021-01-22 15:00'), 1),
      title: '15:00 | Soutenance Mokhtar Mami',
      student: 'Mokhtar Mami',
      filiere: 'GL',
    },
    {
      id: 2,
      start: new Date('2021-01-21 14:00'),
      end: addHours(new Date('2021-01-21 14:00'), 1),
      title: '14:00 | Soutenance Ahmed Attia',
      student: 'Ahmed Attia',
      filiere: 'GL',
    },
    {
      id: 3,
      start: new Date('2021-01-22 11:00'),
      end: addHours(new Date('2021-01-22 11:00'), 1),
      title: '11:00 | Soutenance Skander Trifa',
      student: 'Skander Trifa',
      filiere: 'GL',
    },
    {
      id: 4,
      start: new Date('2021-01-21 10:00'),
      end: addHours(new Date('2021-01-21 10:00'), 1),
      title: '10:00 | Soutenance Soltane Jerbi',
      student: 'Soltane Jerbi',
      filiere: 'GL',
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(public datepipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sort()
  }

  sort() {
    this.events.sort((a, b) => a.start > b.start ? 1 : a.start < b.start ? -1 : 0)
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: any): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {

      width: '600px',
      panelClass: 'custom-dialog-container',
      data: event
    });

    /*event = { 'Start Date': this.datepipe.transform(event.start, 'yyyy-MM-dd HH:mm'), 'End Date': this.datepipe.transform(event.end, 'yyyy-MM-dd HH:mm'), };
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });*/
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
