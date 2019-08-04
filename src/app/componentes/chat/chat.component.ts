import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { Mensaje } from 'src/app/modelos/mensaje';
import { ChatsService } from 'src/app/servicios/chats.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  public chat: any;
  public mensajes = [];
  public sala: any;
  public msg: string;

  constructor(
    private navParams: NavParams, 
    private modal: ModalController, 
    private chatsServicio: ChatsService) {}

  ngOnInit() {
    this.chatsServicio.obtenerSalaDeChat(this.chat.id)
      .subscribe(
        res => {
          console.log(res);
          this.sala = res;
        }
      )
      
    this.chat = this.navParams.get("chat");
  }

  cerrarChat() {
    this.modal.dismiss();
  }

  enviarMensaje() {
    /*this.mensajes.push(this.mensaje);
    this.mensaje.contenido = "";*/

    const mensaje : Mensaje = {
      contenido: this.msg,
      tipo: 'text',
      fecha: new Date()
    }

    this.chatsServicio.enviarMensajeAFirebase(mensaje, this.chat.id);
  }
}
