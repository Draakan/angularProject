import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  message: Message;
  form: FormGroup;
  isLoadingLogin: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  private showMessage(message: Message, time: number = 5000) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, time);
  }

  ngOnInit()
  {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь Вы можете зайти в систему',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы с системой, Вам необходимо войти',
            type: 'warning'
          });
        }
      })

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit()
  {
    this.isLoadingLogin = true;
    this.showMessage({
      text: 'Загрузка...',
      type: 'success'
    }, 90000);

    this.usersService.login(this.form.value)
      .subscribe(
        (data: any) => {
          this.message.text = '';
          this.isLoadingLogin = false;
          localStorage.setItem('token', data.token);
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        },
        err => {
          if (err.status == 400) {
            this.isLoadingLogin = false;
            this.showMessage({
              text: 'Неверный пароль или email',
              type: 'danger'
            });
          }
          else {
            this.isLoadingLogin = false;
            console.log(err);
          }
        });
  }
}
