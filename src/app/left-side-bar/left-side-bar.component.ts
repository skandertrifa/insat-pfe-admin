import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  closeSidebar(){
    this.renderer.addClass(document.body, 'app');
    this.renderer.removeClass(document.body, 'is-collapsed');
  }
}
