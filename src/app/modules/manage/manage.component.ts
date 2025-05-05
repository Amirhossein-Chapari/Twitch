import { Component } from '@angular/core';
import { ClipService } from '../../services/clip.service';
import IClip from '../../models/clip.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-manage',
  standalone: false,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {

  activeClip: IClip | null = null;
  clips: IClip[] = [];

  constructor(private clipService: ClipService, private modal: ModalService) { }

  ngOnInit() {
    this.clipService.getUserClips().subscribe({
      next: (snapshot) => {
        this.clips = [];
        snapshot.forEach(doc => {
          const exists = this.clips.some(clip => clip.uid === doc.data().uid);

          if (exists) {
            this.clips.push({
              // docId: doc.id,
              ...doc.data()
            });
          }
        });
      }
    });
  }

  update(event: IClip) {
    this.clips.forEach((element, i) => {
      // if (element.docId == event.docId) {
      //   this.clips[i].title = event.title;
      // }
    })
  }


  openModal(event: Event, clip: IClip) {
    event.preventDefault();

    this.activeClip = clip;

    this.modal.toggleModal("editClip");
  }

  deletClip(event: Event, clip: IClip) {
    event.preventDefault();

    this.clipService.deletClip(clip);

    this.clips.forEach((element, i) => {
      // if (element.docId == clip.docId) {
      //   this.clips.slice(i, 1);
      // }
    })

  }
}
