import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import { ClipService } from '../../services/clip.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  iaDragover: boolean = false;
  file: File | null = null;
  nextStep: boolean = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'لطفا صبر کنید ویدیو در حال اپلود شدن است'
  isSubmission = false;
  user: firebase.User | null = null

  percentage = 0;
  showPercentage = false;
  task!: AngularFireUploadTask;

  // private starage: AngularFireStorage,
  constructor(private clipService: ClipService, private auth: AngularFireAuth, private router: Router) {
    auth.user.subscribe(user => this.user = user)
  }
  handleStore(e: Event) {
    this.iaDragover = false;
    this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null;

    // MEME TYPES
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true;
  }


  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  uploadFile = new FormGroup({
    title: this.title
  })

  onSubmit() {
    const clipFileName = uuid();
    const clipPath = `clipes/${clipFileName}`;

    this.uploadFile.disable();

    // this.task = this.starage.upload(clipPath, this.file);
    // const clipRef = this.storage.ref(clipPath)

    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'لطفا صبر کنید ویدیو در حال اپلود شدن است';
    this.isSubmission = true;
    this.showPercentage = true;


    this.task.percentageChanges().subscribe((progress) => {
      this.percentage = progress as number / 100;
    })

    this.task.snapshotChanges().pipe(
      last(),
      // switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {

        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value as string,
          fileName: `${clipFileName}.mp4`,
          url
        }

        // const clipDocRef = await this.clipService.createClip(clip);

        this.alertColor = 'green'
        this.alertMsg = 'آپلود با موفقیت انجام شد'
        this.showPercentage = false;

        // this.router.navigate(['clip', clipDocRef.id]);
      },
      error: (err) => {
        this.uploadFile.enable();
        this.alertColor = 'red'
        this.alertMsg = 'آپلود با خطا مواجه شد'
        this.showPercentage = false
        this.isSubmission = false
        console.log(err);

      }
    })
  }
}
