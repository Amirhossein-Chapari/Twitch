import { Component, inject, Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { Firestore } from '@angular/fire/firestore';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  firebaseAuth = inject(Auth);

  credentials = {
    email: '',
    password: ''
  }

  constructor() { }



  login() {


    signInWithEmailAndPassword(this.firebaseAuth, this.credentials.email, this.credentials.password)
      .then((res) => {
        console.log(res);
      });

  }
}

