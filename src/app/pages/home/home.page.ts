import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lastseen;

  constructor(
    private authSerivce: AuthenticationService,
    private langService: LanguageService,
    private storage: Storage,
    private cameraService: CameraService
  ) {
    this.get_lastseen();
  }

  changeAvatar() {
    this.cameraService.takePhoto();
  }

  logout() {
    this.authSerivce.logout();
  }

  get_lastseen() {
    this.storage.get('LASTSEEN').then(res => {
      this.lastseen = res;
    });
  }
  
}
