import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/servicios/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string;
  contra: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  iniciarSesion() {
    this.auth
      .iniciarSesion(this.email, this.contra)
      .then(res =>{
        this.limpiarCampos();
        this.router.navigate(["/home"])
      })
      .catch(error => alert("¡Datos inválidos!"));
  }

  limpiarCampos() {
    this.email = "";
    this.contra = "";
  }
}
