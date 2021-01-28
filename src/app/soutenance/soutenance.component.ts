
import { Component, OnInit } from '@angular/core';
import { Soutenance } from './models/soutenance';
import { SoutenanceService } from './services/soutenance.service';


@Component({
  selector: 'app-soutenance',
  templateUrl: './soutenance.component.html',
  styleUrls: ['./soutenance.component.css']
})
export class SoutenanceComponent implements OnInit {

  soutenances: Soutenance[];
  searchString= "";
  constructor(
    private soutenanceService: SoutenanceService
  ) { }

  ngOnInit(): void {
    this.soutenanceService.getSoutenances().subscribe(
      (response) => {
        console.log(response);
        this.soutenances = response;
        console.log(this.soutenances);
      }
    );


  }

}
