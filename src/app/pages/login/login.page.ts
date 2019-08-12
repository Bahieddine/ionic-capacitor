import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  verify: boolean = false;
  user: {name: string, password: string} = {
    name: '',
    password: ''
  };
  loginForm;

  constructor(
    private authService: AuthenticationService,
    private langService: LanguageService,
    private formBuilder: FormBuilder
  ) { 

    this.loginForm = new FormGroup({
      username: new FormControl(this.user.name, Validators.required),
      password: new FormControl(this.user.name, Validators.required)
    });

  }

  ngOnInit() {
  }

  login() {
    this.verify = false;

    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login();
    } else {
      this.verify = true;
    }    
  }

}
