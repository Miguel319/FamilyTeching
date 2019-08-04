import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/servicios/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"]
})
export class RegistroPage implements OnInit {
  public nombre: string;
  public email: string;
  public contra: string;

  constructor(private authServicio: AuthService, private router: Router) {}

  ngOnInit() {}

  registrarse() {
    this.authServicio
      .registrarse(this.email, this.contra, this.nombre)
      .then(auth => {
        this.router.navigate(['home']);
        console.log(auth);
      })
      .catch(err => console.log(err));
  }
}
