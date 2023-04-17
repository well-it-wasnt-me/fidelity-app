import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trx-list',
  templateUrl: './trx-list.page.html',
  styleUrls: ['./trx-list.page.scss'],
})
export class TrxListPage implements OnInit {
  last_transactions: any[] = [];

  constructor(private acs: ApiCallService, private router: Router) {
    this.loadTransactions();
  }

  ngOnInit() {
  }

  goToDetail(rec_id: number) {
    this.router.navigate(['/transaction-detail/' + rec_id])
  }

  loadTransactions(){
    this.acs.TransactionHistory(1000).then((trx) => {
      if(trx.list.length > 0){
        this.last_transactions = trx.list;
      } else {
        this.last_transactions = [];
      }
    });
  }
}
