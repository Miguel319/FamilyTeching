import { Component, OnInit } from "@angular/core";
import { AuthService } from "../servicios/auth.service";
import { ChatsService } from "../servicios/chats.service";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { ChatComponent } from "../componentes/chat/chat.component";

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
    private modal: ModalController,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.salasDeChat = [];

    this.chatServicio.obtenerSalas().subscribe(res => {
      this.salasDeChat = res;
    }),
      err => console.log(err);
  }

  abrirChat(chat: any) {
    this.modal
      .create({
        component: ChatComponent,
        componentProps: {
          chat: chat
        }
      })
      .then(modal => modal.present());
  }

  cerrarSesion() {
    this.authServicicio.cerrarSesion();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Opciones",
      buttons: [
        {
          text: "Cerrar sesión",
          role: "destructive",
          icon: "log-out",
          handler: () => {
            this.cerrarSesion();
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
