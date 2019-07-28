import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  name: string;

  constructor(private navParams: NavParams, private modal: ModalController) {}

  ngOnInit() {
    this.name = this.navParams.get("name");
  }

  cerrarChat() {
    this.modal.dismiss();
  }
}
