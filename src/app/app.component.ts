import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { AuthModalComponent } from "./components/user/auth-modal/auth-modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, AuthModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Twitch';
}
