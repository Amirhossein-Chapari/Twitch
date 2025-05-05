import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {

  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();


  clipId = new FormControl('');
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  editForm = new FormGroup({
    title: this.title,
    id: this.clipId
  })

  showAlert: boolean = false;
  alertMsg: string = 'در حال انجام';
  alertColor = "blue";

  constructor(private modal: ModalService, private clipService: ClipService) { }

  ngOnInit() {
    this.modal.register("editModal");
  }

  ngOnChanges() {

    if (!this.activeClip) {
      return;
    }

    this.showAlert = false;
    // this.clipId.setValue(this.activeClip!.docId);
    this.title.setValue(this.activeClip!.title)
  }

  ngOnDestroy(): void {
    this.modal.unregister("editModal");
  }

  submit() {
    if (!this.activeClip) {
      return;
    }

    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'در حال انجام';

    try {
      this.clipService.updateClip(this.clipId.value!, this.title.value!)
    } catch (error) {
      this.showAlert = true;
      this.alertColor = 'red';
      this.alertMsg = 'مشکلی در عملیات بوجود آمد';
      return;
    }

    this.activeClip.title = this.title.value!;
    this.update.emit(this.activeClip);

    this.alertColor = 'green';
    this.alertMsg = 'عملیات با موفقیت انجام شد';
  }

}
