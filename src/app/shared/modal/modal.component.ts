import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  modalService = inject(ModalService)
  @Input() modalId = '';
  closeModal() {
    this.modalService.toggleModal(this.modalId)
  }
}
