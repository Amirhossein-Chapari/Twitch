import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { IUser } from '../models/user.model';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firebaseDb = inject(Firestore); 

  constructor() {}

  async createUser(userData: IUser) {
    console.log(userData);

    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    // Create a new user with email and password in Firebase Authentication
    const userCred = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      userData.email!,
      userData.password
    );

    console.log(userCred);

    if (!userCred.user) {
      throw new Error('User registration failed!');
    }

    // Create a reference to the user document in Firestore
    const userRef = doc(this.firebaseDb, 'users', userCred.user.uid);

    // Set the user data in Firestore
    await setDoc(userRef, {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phone: userData.phone,
    });

    // Update the user's display name in Firebase Authentication
    await updateProfile(userCred.user, {
      displayName: userData.name,
    });
  }
}
