import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private router: Router,
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

}
