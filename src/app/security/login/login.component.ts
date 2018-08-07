import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './../../core/service/login.service';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private _formBuilder: FormBuilder,
              private _loginService: LoginService,
              private _notificationService: NotificationService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control('', [Validators.required, Validators.email]),
      password: this._formBuilder.control('', [Validators.required])
    })
    this.navigateTo = this._activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this._loginService.login(this.loginForm.value.email, this.loginForm.value.password)
                      .subscribe(user =>
                                  this._notificationService.nofity(`Bem vindo, ${user.name}`),
                                response => // HttpErrorResponse
                                this._notificationService.nofity(response.error.message),
                                () => {
                                  this._router.navigate([ atob(this.navigateTo)])
                                })
  }

}
