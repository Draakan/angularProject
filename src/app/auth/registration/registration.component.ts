import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const { email, password, name } = this.form.value;

    this.usersService.createNewUser(new User(email, name, password, name + 'Nik'))
      .subscribe((data: any) => {
        if (data.succeeded === true) {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          })
        } else
          //TODO: toastr
          console.log(data);
      }),
      err => {
        console.log(err);
      };
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((data: any) => {
          if (data.status) {
            resolve({ forbiddenEmail: true });
          } else {
            resolve(null);
          }
        })
    });
  }

}
