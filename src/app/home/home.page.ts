import { Component, OnInit } from "@angular/core";
import { AuthService } from "../servicios/auth.service";
import { ChatsService } from "../servicios/chats.service";
import { Chat } from "../modelos/chat.model";
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public salasDeChat: any;

  constructor(
    private authServicicio: AuthService,
    private chatServicio: ChatsService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.salasDeChat = [];

    this.chatServicio.obtenerSalas().subscribe(res => {
      this.salasDeChat = res;
    }),
      err => console.log(err);
  }

  abrirChat(chat: any) {
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        name: chat.name
      }
    }).then((modal) => modal.present());
  }

  cerrarSesion() {
    this.authServicicio.cerrarSesion();
  }
}
