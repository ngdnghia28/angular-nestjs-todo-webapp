import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})

export class UserloginComponent implements OnInit {
  formdata;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', this.passwordvalidation)
    });
  }

  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
      return { password: true };
    }
  }

  onClickSubmit(credentials) {
    this.userService
      .attemptAuth(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/todos'),
        err => {
          alert('Wrong email or password.');
        }
      );
  }
}
