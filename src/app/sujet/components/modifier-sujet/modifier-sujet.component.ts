import { Sujet } from './../../model/sujet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-sujet',
  templateUrl: './modifier-sujet.component.html',
  styleUrls: ['./modifier-sujet.component.css']
})
export class ModifierSujetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedSujet : Sujet;


}
