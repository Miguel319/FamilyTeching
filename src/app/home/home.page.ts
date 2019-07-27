import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authServicicio: AuthService) {}

  cerrarSesion() {
    this.authServicicio.cerrarSesion();
  }

}
