import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['Dashbord']);
    }
  }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.access_token);
        this.toastrService.success('Bienvenue !');
        //console.log(response.access_token)
        this.router.navigate(['Dashbord']);
      },
      (erreur) => {
        this.toastrService.error('Veuillez vérifier vos credentials');
      }
    );
  }

}
