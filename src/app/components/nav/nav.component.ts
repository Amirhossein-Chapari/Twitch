import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  modalService = inject(ModalService)

  openModal(e: Event) {
    e.preventDefault();
    this.modalService.toggleModal('auth');
  }

}
