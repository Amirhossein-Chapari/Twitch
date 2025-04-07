import { Component } from '@angular/core';
import { NavComponent } from "./components/nav/nav.component";
import { AuthModalComponent } from "./components/user/auth-modal/auth-modal.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ NavComponent, AuthModalComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Twitch';
}
