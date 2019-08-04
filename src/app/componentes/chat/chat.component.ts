import { Component, OnInit, ViewChild } from "@angular/core";
import { NavParams, ModalController, IonContent } from "@ionic/angular";
import { Mensaje } from "src/app/modelos/mensaje";
import { ChatsService } from "src/app/servicios/chats.service";
import { AuthService } from "src/app/servicios/auth.service";

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
  public usuario: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private navParams: NavParams,
    private modal: ModalController,
    private chatsServicio: ChatsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.auth
      .obtenerUsuarioActual()
      .substring(0, this.auth.obtenerUsuarioActual().indexOf("@"));

    console.log(this.usuario);

    this.chatsServicio.obtenerSalaDeChat(this.chat.id).subscribe(res => {
      console.log(res);
      this.sala = res;
    });

    this.chat = this.navParams.get("chat");

   // this.content.scrollToBottom(600);
  }

  cerrarChat() {
    this.modal.dismiss();
  }

  enviarMensaje() {
    /*this.mensajes.push(this.mensaje);
    this.mensaje.contenido = "";*/

    const mensaje: Mensaje = {
      contenido: this.msg,
      tipo: "Text",
      fecha: new Date().getDate(),
      usuario: this.auth
        .obtenerUsuarioActual()
        .substring(0, this.auth.obtenerUsuarioActual().indexOf("@"))
    };

    this.msg = "";

    /*setTimeout(() => {
      this.content.scrollToBottom(600);
    });*/
    this.chatsServicio.enviarMensajeAFirebase(mensaje, this.chat.id);
  }
}
