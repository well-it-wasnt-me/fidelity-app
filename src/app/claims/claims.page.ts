import { Component, OnInit } from '@angular/core';
import {ApiCallService} from "../services/api-call.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.page.html',
  styleUrls: ['./claims.page.scss'],
})
export class ClaimsPage implements OnInit {
  list_claims: any = [];

  constructor(private acs: ApiCallService, private router: Router) {
    this.acs.claimsHistory().then((res) => {
      this.list_claims = res;
    });
  }

  ngOnInit() {
  }

  goToDetail(claim_id: number) {
    this.router.navigate(['/claim-detail/' + claim_id]);
  }
}
