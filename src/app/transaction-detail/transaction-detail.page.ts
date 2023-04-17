import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiCallService} from "../services/api-call.service";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {
  receipt_detail: any = [];
  constructor(private route: ActivatedRoute, private acs: ApiCallService) {
    let trx_id = <number><unknown>this.route.snapshot.paramMap.get('id');
    this.acs.TransactionDetail(trx_id).then((result) => {
      this.receipt_detail = result;
    })
  }

  ngOnInit() {
  }

}
