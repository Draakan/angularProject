import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.componet.html'
})

export class AuthComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(['/login']);
  }

}
