import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile = false;
  email: '';
  nom: '';
  prenom: '';
  sidebarActive=false
  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer:Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const { email, nom, prenom } = this.authService.getDecodedAccessToken(token);
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;

  }
  changeProfile(){
    this.profile = !this.profile;
  }
  handleLogout(){
    this.authService.logout();
    this.router.navigate(['Login']);
  }
  
  changeSidebar(){
    if (!this.document.body.classList.contains('is-collapsed'))
    {
      this.renderer.addClass(document.body, 'app');
      this.renderer.addClass(document.body, 'is-collapsed');
    }
    else {
      this.renderer.addClass(document.body, 'app');
      this.renderer.removeClass(document.body, 'is-collapsed');
    }
  }

}
