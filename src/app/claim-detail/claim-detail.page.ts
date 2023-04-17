import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.page.html',
  styleUrls: ['./claim-detail.page.scss'],
})
export class ClaimDetailPage implements OnInit {
  claim_detail: any = [];

  constructor(private route: ActivatedRoute, private acs: ApiCallService) {
    let claim_id = <number><unknown>this.route.snapshot.paramMap.get('claim_id');
    this.acs.claimDetail(claim_id).then((res) => {
      this.claim_detail = res;
    });
  }

  ngOnInit() {
  }

}
