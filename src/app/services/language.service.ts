import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  defaultLang_info = new BehaviorSubject({ lang: 'en', dir: 'ltr' });
  menuTrans = {
		"en": {
			"header": "Menu",
			"content": {
				"lastSeen": "last seen",
				"menu": ["Home", "Change Avatar"]
			},
			"footer": {
				"lang": "العربية",
				"btn": "LOGOUT"
			}
		},
		"ar": {
			"header": "الرئيسية",
			"content": {
				"lastSeen": "آخر ظهور",
				"menu": [
					"الرئيسية",
					"تغيير صورة"
				]
			},
			"footer": {
				"lang": "English",
				"btn": "تسجيل الخروج"
			}
		}
	};
  loginTrans = {
		"en": {
			"content": {
				"username": "Username",
				"password": "Password",
				"remember": "Remember me",
				"login": "Login",
				"validationMsg": "Username or Password is not valid"
			}
		},
		"ar": {
			"content": {
				"username": "اسم المستخدم",
				"password": "كلمة المرور",
				"remember": "تذكرني",
				"login": "تسجيل دخول",
				"validationMsg": "اسم المستخدم او كلمة المرور غير صحيحة"
			}
		}
	};
	homeTrans = {
		"en": {
			"header": "Home",
			"content": {
				"header": "WLECOME TO RIYAD BANK",
				"lastSeen": "Last seen"
			},
			"footer": {
				"logout": {"text": "LOGOUT", "slot": "end"}
			}
		},
		"ar": {
			"header": "الرئيسية",
			"content": {
				"header": "مرحبا بك في بنك الرياض",
				"lastSeen": "آخر ظهور"
			},
			"footer": {
				"logout": { "text": "تسحيل خروج", "slot": "start" }
			}
		}
	}
  menuData;
  loginData;
  homeData;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.platform.ready().then(() => {
      this.checkLang();
    });

   }

  changeLang(lang_info: {lang: string, dir: string}): void {
    this.storage.set('LANG_INFO', lang_info).then(res => {
      this.defaultLang_info.next(res);
      this.document.dir = res.dir;
      this.splashScreen.show();
      this.menuData = this.menuTrans[this.getLang_info().lang];
      this.loginData = this.loginTrans[this.getLang_info().lang];
      this.homeData = this.homeTrans[this.getLang_info().lang];
      location.reload();
    });
  }

  checkLang() {
    this.storage.get('LANG_INFO').then(res => {
      if (res) {
        this.defaultLang_info.next(res);
        this.document.dir = res.dir;
      } else {
        this.storage.set('LANG_INFO', { lang: 'en', dir: 'ltr' }).then(res => {
          this.defaultLang_info.next(res);
        });
      }
    }).then(() => {
      this.menuData = this.menuTrans[this.getLang_info().lang];
      this.loginData = this.loginTrans[this.getLang_info().lang];
      this.homeData = this.homeTrans[this.getLang_info().lang];
    });
  }

  getLang_info() {
    return this.defaultLang_info.value;
  }
}