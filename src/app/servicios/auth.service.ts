import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { reject } from "q";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
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

  registrarse(email: string, contra: string, nombre: string) {
    return new Promise((res, reject) => {
      this.angularFireAuth.auth
        .createUserWithEmailAndPassword(email, contra)
        .then(data => {
          //console.log(data.user.uid);
          const uid = data.user.uid;
          this.db.collection("usuarios").doc(uid).set({
            nombre: nombre,
            uid: uid
          })
          res(data);
        })
        .catch(err => reject(err));
    });
  }
}
