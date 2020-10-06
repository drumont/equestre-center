import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      licence: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    const val = this.form.value;

    if (val.email && val.password && val.firstname) {
      this.authService.register(val.email, val.password, val.firstname, val.lastname, val.licence, val.phone)
        .subscribe( () => {
          console.log('User and Account creater');
          this.authService.login(val.email, val.password)
            .subscribe(() => {
              this.router.navigate(['dashboard']);
            });
        });
    }
  }

}
