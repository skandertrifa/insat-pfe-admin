import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Soutenance } from 'src/app/soutenance/models/soutenance';
import { SoutenanceService } from 'src/app/soutenance/services/soutenance.service';

@Component({
  selector: 'app-modifier-soutenance',
  templateUrl: './modifier-soutenance.component.html',
  styleUrls: ['./modifier-soutenance.component.css']
})
export class ModifierSoutenanceComponent implements OnInit {

  id: number = null
  
  constructor(
    private route: ActivatedRoute  
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("params : ",params);
      this.id=+params['id'];
   }); 
  }


}
