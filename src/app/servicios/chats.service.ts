import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Chat } from '../modelos/chat.model';

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
}
