import { Component } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import {ApiCallService} from "../services/api-call.service";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  myData: any;
  language: any;
  MyPoints: number = 0;
  MyID: string = "000000000";
  last_transactions: any[] = [];
  logged: boolean = false;

  constructor(private translateConfigService: TranslateConfigService,
              private acs: ApiCallService,
              private router: Router,
              private storageService: StorageService) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
    this.storageService.get('my_data').then((value) => {
      if(value){
        this.loadTransactions();
        this.loadMyData();
        this.logged = true;
        this.myData = value;
        this.MyID = value.user_id;
        this.acs.TotalPoints().then((res) => {
          if(res.status === 'error'){
            alert(res.message);
          }
          this.MyPoints = res.total_points;
        });
      }
    });
  }

  loadTransactions(){
    this.acs.TransactionHistory(10).then((trx) => {
      if(trx.list.length > 0){
        this.last_transactions = trx.list;
      } else {
        this.last_transactions = [];
      }
    });
  }

  loadMyData(){

  }
  goToNotification() {

  }

  goToHistory() {
    this.router.navigate(['/claims']);
  }

  goToPrizes() {
    this.router.navigate(['/prizes'])
  }

  readQRCode() {
    const startScan = async () => {
      // Check camera permission
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
        this.analyzeContent(result.content);
      }
    };
  }

  analyzeContent(json:string){
    if(!this.isJson(json)){
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      alert("Not a valid Qr-Code");
      return;
    }

    let qr_code = JSON.parse(json);
    this.acs.claimQRcode(qr_code).then((res)=> {
      alert(res.message);
    });


  }

  isJson(item: string) {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return typeof value === "object" && value !== null;
  }


  goToDetail(receipt_number: number) {
    this.router.navigate(['/transaction-detail/' + receipt_number])
  }

  goToRegister() {
    this.router.navigate(['/registration']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.translateConfigService.getDefaultLanguage();
      this.language = this.translateConfigService.getCurrentLang();
      this.storageService.get('my_data').then((value) => {
        if(value){
          this.loadTransactions();
          this.loadMyData();
          this.logged = true;
          this.myData = value;
          this.MyID = value.user_id;
          this.acs.TotalPoints().then((res) => {
            if(res.status === 'error'){
              alert(res.message);
            }
            this.MyPoints = res.total_points;
          });
        }
      });
      // @ts-ignore
      event.target.complete();
    }, 2000);
  }

  goToTransactionList() {
    this.router.navigate(['/trx-list'])
  }
}
