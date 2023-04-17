import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private acs: ApiCallService, private loadingCtrl: LoadingController, private route: Router, private storageService: StorageService) { }

  myLogin = {
    email:"",
    password:""
  };
  ngOnInit() {
  }

  goToVerify() {

  }

  goToRegister() {

  }

  goToForgot() {

  }

  async doLogin(){
    await this.acs.Login(this.myLogin).then((res) => {
      if(res.status === 'error'){
        return;
      }

      this.storageService.store('access_token', res.access_token);
      this.storageService.store('my_data', jwtDecode(res.access_token));
      this.route.navigate(['/']);

    })
  }
}
