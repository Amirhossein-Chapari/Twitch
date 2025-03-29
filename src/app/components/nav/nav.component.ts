import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { Auth, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  modalService = inject(ModalService);
  authService = inject(AuthService);
  auth = inject(Auth); 

  openModal(event: Event) {
    event.preventDefault();
    this.modalService.toggleModal('auth');
  }

  async logout(event: Event) {
    event.preventDefault();

    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
