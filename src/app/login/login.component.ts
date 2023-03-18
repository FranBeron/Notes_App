import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  public isLoading = false;
  public loginError = false;
  message: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        this.isLoading = true;

        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.message = 'El usuario o la contraseña son incorrectos';
      });
  }

  signInWithGoogle() {
    this.isLoading = true;
    this.userService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
  }
}
