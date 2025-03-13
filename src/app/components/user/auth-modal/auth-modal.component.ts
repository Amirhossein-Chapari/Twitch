import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";


@Component({
  selector: 'app-auth-modal',
  imports: [SharedModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {

}
