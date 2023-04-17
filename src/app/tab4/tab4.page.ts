import { Component } from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {TranslateConfigService} from "../services/translate-config.service";
import {ActionSheetController} from "@ionic/angular";
import {Md5} from "ts-md5";
import { Share } from '@capacitor/share';
import {environment} from "../../environments/environment";
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  profile_pic: string = "";
  logged: boolean = false;
  language: any;

  constructor(
    private storageService: StorageService,
    private route: Router,
    private translateConfigService: TranslateConfigService,
    public actionSheetController: ActionSheetController,
  ) {
    this.storageService.get('my_data').then((value) => {
      if(value){
        this.logged = true;
        this.profile_pic = "https://www.gravatar.com/avatar/" + Md5.hashStr(value.email);
      }
    });
  }
  goToProfile(){
    this.route.navigate(['/edit-profile'])
  }
  goToLogin() {
    this.route.navigate(['/login']);
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');
        }
      }, {
        text: 'Italian',
        icon: 'language-outline',
        handler: () => {
          this.language = 'it';
          this.translateConfigService.setLanguage('it');
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }

  async shareApp(){
    await Share.share({
      title: 'Hey ! Check this out !',
      text: 'Really awesome thing you need to see right now',
      url: environment.main_server,
      dialogTitle: 'Share with buddies',
    });

  }

  async notifications(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Notifications',
      buttons: [{
        text: 'Keep having notification',
        icon: 'notifications-outline',
        handler: async () => {
          let permStatus = await PushNotifications.checkPermissions();

          if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
          }

          if (permStatus.receive !== 'granted') {
            throw new Error('User denied permissions!');
          }

          await PushNotifications.register();
          alert("Registered");
        }
      }, {
        text: 'Remove me from Notifications',
        icon: 'notifications-off-outline',
        handler: async () => {
          await PushNotifications.removeAllListeners();
          alert("Was nice having you")
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
  }

  async logout(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Log Out',
      buttons: [{
        text: 'Log me Out',
        icon: 'notifications-outline',
        handler: async () => {
          this.logged = false;
          this.storageService.removeStorageItem('my_data');
          this.storageService.removeStorageItem('access_token');
          this.route.navigate(['']);
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

  }

  login() {
    this.route.navigate(['/tabs/tab1'])
  }
}
