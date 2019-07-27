import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

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
}
