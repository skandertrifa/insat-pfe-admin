import { ToastrService } from 'ngx-toastr';
import { SujetService } from './../../sujet/services/sujet.service';
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
    public datepipe: DatePipe,
    private sujetService: SujetService,
    private toastrService: ToastrService) { }

  updateForm: FormGroup;
  jury = "*) President:\n    • " + this.data.jury.president.userDetails.nom + " " + this.data.jury.president.userDetails.prenom + "\n\n*) Membres:\n    ";
  ngOnInit(): void {
    this.data.jury.members.forEach(teacher => {
      this.jury = this.jury + "• " + teacher.userDetails.nom + " " + teacher.userDetails.prenom + "\n    "
    });
    this.jury = this.jury.substring(0,this.jury.length-2);
    this.updateForm = new FormGroup({
      student: new FormControl(this.data.sujet.etudiant.userDetails.nom + " " + this.data.sujet.etudiant.userDetails.prenom),
      filiere: new FormControl(this.data.sujet.etudiant.filiere),
      date: new FormControl(this.datepipe.transform(this.data.start, 'yyyy-M-d')),
      startHour: new FormControl(this.datepipe.transform(this.data.start, 'HH:mm')),
      endHour: new FormControl(this.datepipe.transform(this.data.end, 'HH:mm')),
      salle: new FormControl(this.data.salle.code),
      sujet: new FormControl(this.data.sujet.titre + " - " + this.data.sujet.description),
      dateLimiteDepot: new FormControl(this.datepipe.transform(this.data.sujet.dateLimiteDepot, 'yyyy-M-d') + " - " + this.datepipe.transform(this.data.sujet.dateLimiteDepot, 'HH:mm')),
      jury: new FormControl(this.jury)
    });
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  downloadRapport() {
    this.sujetService.downloadRapport(this.data.sujet.rapportPfe.id).subscribe(
      res => this.toastrService.success('Le téléchargement du fichier a commencé'),
      err => this.toastrService.error('Téléchragement échoué')
    )
  }

}
