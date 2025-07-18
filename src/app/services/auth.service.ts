import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { IUser } from '../models/user.model';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firebaseDb = inject(Firestore);

  public isAuthenticated: Observable<boolean>;

  constructor( private router: Router) {
    this.isAuthenticated = authState(this.firebaseAuth).pipe(
      map((user) => !!user)
    );
  }

  async createUser(userData: IUser): Promise<void> {
    console.log(userData);

    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    try {
    
      const userCred = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        userData.email!,
        userData.password
      );

      console.log(userCred);

      if (!userCred.user) {
        throw new Error('User registration failed!');
      }

      // ایجاد یک سند برای کاربر در Firestore
      const userRef = doc(this.firebaseDb, 'users', userCred.user.uid);

      await setDoc(userRef, {
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phone: userData.phone,
      });

      await updateProfile(userCred.user, {
        displayName: userData.name,
      });

    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async logout(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.firebaseAuth.signOut();
    this.router.navigateByUrl('/');
  }
}
