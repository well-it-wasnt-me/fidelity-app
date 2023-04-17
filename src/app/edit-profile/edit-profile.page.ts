import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {StorageService} from "../services/storage.service";
import {Md5} from "ts-md5";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile_pic: string = "";
  my_data: any = {
    f_name:"",
    l_name:"",
    full_addr:"",
    phone_number: ""
  };
  constructor(private acs: ApiCallService, private storage: StorageService) {
    this.storage.get('my_data').then((value) => {
      this.my_data.f_name = value.f_name;
      this.my_data.l_name = value.l_name;
      this.getGravatar(value.email)
    })
  }

  ngOnInit() {
  }

  getGravatar(email:string){
    this.profile_pic = "https://www.gravatar.com/avatar/" + Md5.hashStr(email);
  }


updateData = {
  password : "",
  f_name : "",
  l_name : "",
  phone_number: "",
  full_addr: ""
}
updateProfile() {

  this.acs.UpdateProfile(this.updateData).then((res)=>{
    alert(res.message);
  });
}


}
