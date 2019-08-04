import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Chat } from '../modelos/chat.model';
import { Mensaje } from '../modelos/mensaje';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db: AngularFirestore) { }

  obtenerSalas() {
    return this.db.collection('salasDeChat').snapshotChanges()
      .pipe(map(salas => {
        return salas.map(x => {
          const data = x.payload.doc.data() as Chat;
          data.id = x.payload.doc.id;
          return data;
        })
      }));
  }

  obtenerSalaDeChat(chatId) {
    return this.db.collection('salasDeChat').doc(chatId).valueChanges();
  }

  enviarMensajeAFirebase(mensaje: Mensaje, chatId: string) {
    this.db.collection('salasDeChat').doc(chatId)
      .update({
        mensajes: firestore.FieldValue.arrayUnion(mensaje)
      });
  }
}
