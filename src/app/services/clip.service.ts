import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, of, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection!: AngularFirestoreCollection<IClip>;


  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private storage: AngularFireStorage) {
    this.clipsCollection = db.collection('clips');
  }


  createClip(data: IClip) {
    return this.clipsCollection.add(data)
  }

  getUserClips() {

    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        };

        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        );

        return query.get();
      }),
      map(snapShot => {
        return (snapShot as QuerySnapshot<IClip>).docs;
      })

    )
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title
    })
  }

  deletClip(clip: IClip) {
    const clipRef = this.storage.ref(`clip/${clip.fileName}`);

    // await clipRef.delete();
    // await this.clipsCollection.doc(clip.docId).delete();

  }
}
