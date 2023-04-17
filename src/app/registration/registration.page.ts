import {Component, OnInit} from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerData = {
    fname:"",
    lname:"",
    email:"",
    password:""
  };
  register_error: boolean = false;
  register_success: boolean = false;

  constructor(private acs: ApiCallService, private loadingCtrl: LoadingController, private route: Router) { }

  ngOnInit() {
  }

  async doRegistration() {
    this.register_error = false;
    this.register_success = false;
    const loader = await this.loadingCtrl.create({
      message: 'Caricamento...',
      spinner: 'circles',
    });

    loader.present();

    let RegistrationResult = this.acs.Registration(this.registerData);

    RegistrationResult.then((res) => {
       if( res.status === 'error'){
         this.register_error = true;
         loader.dismiss();
         return;
       }
       console.log(res.status);
       loader.dismiss();
       this.register_success = true;
       this.route.navigate(['/login']);

    });
  }
}
