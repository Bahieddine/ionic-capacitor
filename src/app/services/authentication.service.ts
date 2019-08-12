import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  stayIn: boolean = false;
  user;

  constructor(
    private router: Router,
    public storage: Storage,
    private platform: Platform,
    public toastCtrl: ToastController
  ) {
   
    // this.platform.ready().then(() => {
    //   this.ifLoggedIn();
    // });
  
  }
  
  //Methods
  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.user = response;
        this.authState.next(true);
      }
    });
  }

  login() {
    var dummy_response = {
      user_id: '007',
      user_name: 'Ahmed Mahmoud Bahieddine'
    };

    if (this.stayIn) {
      this.storage.set('USER_INFO', dummy_response).then((response) => {
        this.router.navigate(['home']);
        this.user = response;
        this.authState.next(true);
      });
    } else {
      this.router.navigate(['home']);
      this.user = dummy_response;
      this.authState.next(true);
    }
    
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  getUser() {
    return this.user;
  }
}
