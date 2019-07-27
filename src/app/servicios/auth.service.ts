import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  iniciarSesion(email: string, contra: string) {
    return new Promise((resolve, rejected) => {
      this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, contra)
        .then(res => {
          resolve(res);
        })
        .catch(err => rejected(err));
    });
  }

  cerrarSesion() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
