import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  url: string;

  constructor(
    private renderer: Renderer2,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.url = this.router.url.split("?",1)[0];
    // use of ngclass
    //[ngClass]="currentPage === i + 1 ? 'active' : ''"
  }


  closeSidebar(){
    this.renderer.addClass(document.body, 'app');
    this.renderer.removeClass(document.body, 'is-collapsed');
  }

  changeUrl(url: string){
    this.url = url;
  }
}
