import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { Storage } from '@ionic/storage';
import { CameraService } from './services/camera.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  menuEnable: boolean = false;
  lastseen;
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    private langService: LanguageService,
    private storage: Storage,
    private cameraService: CameraService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.ifLoggedIn();
      
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
          this.menuEnable = true;
        } else {
          this.router.navigate(['login']);
          this.menuEnable = false;
        }
      });
      
      this.langService.checkLang();

      this.get_lastseen();
      this.set_lastseen();

      this.cameraService.checkAvatar();
    });
  }

  changeAvatar() {
    this.cameraService.takePhoto();
  }

  changeLang(langInfo: {lang: string, dir: string}) {
    this.langService.changeLang(langInfo);
  }

  set_lastseen() {
    setInterval(() => {
      this.storage.set('LASTSEEN', Date.now());
    }, 60000);
  }

  get_lastseen() {
    this.storage.get('LASTSEEN').then(res => {
      this.lastseen = res;
    });
  }
}
