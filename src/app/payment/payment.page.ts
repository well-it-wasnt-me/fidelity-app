import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateConfigService} from "../services/translate-config.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  language: any;
  status: string;
  showOk: boolean = false;
  showErr: boolean = false;
  constructor(private translateConfigService: TranslateConfigService, private translate: TranslateService, private route: ActivatedRoute, private router: Router) {
    this.status = <string>this.route.snapshot.paramMap.get('status');
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();

    if( this.status === 'ok'){
      this.showOk = true;
    } else if (this.status === 'ko'){
      this.showErr = true;
    } else {
      this.showOk = false;
      this.showErr = false;
    }

  }

  ngOnInit() {
  }

  backHome() {
    this.router.navigate(['/'])
  }
}
