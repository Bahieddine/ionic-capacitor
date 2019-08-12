import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraDirection } from '@capacitor/core';
import { Storage } from '@ionic/storage';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  avatar: SafeResourceUrl = '../../../assets/avatar-default-icon.png';

  constructor(
    private storage: Storage,
    private sanitizer: DomSanitizer
  ) { }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      direction: CameraDirection.Front,
      source: CameraSource.Camera
    });
    
    this.avatar = image.webPath;

    this.storage.set('AVATAR_PATH', this.avatar);
  }

  checkAvatar() {
    this.storage.get("AVATAR_PATH").then(res => {
      if (res) {
        this.avatar = res;
      }
    });
  }
}
