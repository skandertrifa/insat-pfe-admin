import { SoutenanceService } from './../soutenance/services/soutenance.service';
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
      start: new Date('2021-01-21 14:00'),
      end: addHours(new Date('2021-01-21 14:00'), 1),
      title: '14:00 | Soutenance Ahmed Attia',
      student: 'Ahmed Attia',
      filiere: 'GL',
      salle: 223,
      jury: [
        {
          id: 1,
          userDetails: {
            id: 1,
            nom: "Teacher",
            prenom: "1",
            email: "teacher1@gmail.com",
            role: "teacher",
            createdAt: new Date('0000-00-00'),
            updatedAt: new Date('0000-00-00'),
            deletedAt: null
          }
        },
        {
          id: 2,
          userDetails: {
            id: 2,
            nom: "Teacher",
            prenom: "2",
            email: "teacher2@gmail.com",
            role: "teacher",
            createdAt: new Date('0000-00-00'),
            updatedAt: new Date('0000-00-00'),
            deletedAt: null
          }
        }
      ],
      sujet: {
        id: 1,
        titre: 'CMS',
        dateLimiteDepot: new Date('2021-01-31 23:59'),
        description: 'Wordpress',
        rapportPfe: {
          id: 1,
          path: '/www.pdf',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(public datepipe: DatePipe, public dialog: MatDialog, private soutenanceService: SoutenanceService) { }

  ngOnInit(): void {
    /*this.soutenanceService.getSoutenances().subscribe(
      res => {
        this.events = res.items;
        this.events[0].start = new Date(res.items[0].dateDePassage);
        console.log(res.items);
        this.sort();
      }
    );*/
    this.sort();
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
