import { Injectable } from '@angular/core';
import  axios  from 'axios';
import {StorageService} from "./storage.service";
import {environment} from "../../environments/environment";
import {HttpParams} from "@angular/common/http";


const server = environment.main_server;
const endpoint = {
  register      : server+"register",
  login         : server+"login",
  listProduct   : function(cat_id: number){
    return server+"mobile/api/product/list/"+cat_id
  },
  latestProduct : server+"mobile/api/product/latest",
  prizeProducts : server+"mobile/api/prize/latest",
  listPoints    : server+"mobile/api/points/list",
  totalPoints   : server+"mobile/api/points/total",
  productDetail : function(id: number){
    return server+"mobile/api/product/detail/"+id
  },

  prizeDetail : function(id: number){
    return server+"mobile/api/prize/detail/"+id
  },
  trxHistory : function(limit: number){
    return server+"mobile/api/transactions/list/"+limit
  },
  categoriesList: server+"mobile/api/categories/list",
  categoriesPrize: server+"mobile/api/prize/categories/list",
  registerTrx: server+"mobile/api/register/transaction",
  transactionDetail: function(trx_id: number){
    return server+"mobile/api/transactions/detail/"+trx_id
  },
  claimPrize: function(prize_id: number){
    return server+"mobile/api/prize/claim/"+prize_id
  },
  listClaims: server+"mobile/api/claims/list",
  claimDetail: function(claim_id: number){
    return server+"mobile/api/claim/detail/"+claim_id
  },
  qrCodeClaim: server+"mobile/api/claim/qr_code",
  profileUpdate: server+"mobile/api/profile/update"
}
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  constructor(private storageService: StorageService) { }

  async Registration(param: any) {
    var results = {status: "", message:""};
    const config = {
      headers: { 'Content-Type': 'application/x-wwww-form-urlencoded' }
    };

    let fd = new FormData();
    fd.append('fname', param.fname);
    fd.append('lname', param.lname);
    fd.append('email', param.email);
    fd.append('password', param.email)

    await axios.post(endpoint.register, fd, config)
      .then((response) => {
      results = response.data;
    })
      .catch((error) => {
        console.log('axios error', error);
       results = {status:'error', message: 'something went wrong' };
      });

    return results;
  }
  async Login(param: any){
    var results = {status: "", access_token:"", expires_in:"", token_type:''};
    const config = {
      headers: { 'Content-Type': 'application/x-wwww-form-urlencoded' }
    };

    let fd = new FormData();
    fd.append('email', param.email);
    fd.append('password', param.password)

    await axios.post(endpoint.login, fd, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = {status: "error", access_token:"", expires_in:"", token_type:''};
      });

    return results;
  }

  /**
   * Transaction History
   * @param limit How many records to load
   * @constructor
   */
  async TransactionHistory(limit: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: any = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.trxHistory(10), config)
      .then((response) => {
        results = response.data;
      })
      .catch( (error) => {
          results = [];
        })

    return results;
  }
  ViewProduct(product_id: number){}
  async ListProducts(category_id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.listProduct(category_id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async LatestProducts(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results = {};

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.latestProduct, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = {};
      });

    return results;
  }
  async ListCategories(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.categoriesList, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async TotalPoints(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results = {status: "", message:"", total_points:0};

    const config = {
      headers: { 'Content-Type': 'application/json',
                  'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.totalPoints, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = {status: "error", message:"Axios Error", total_points:0};
      });

    return results;
  }
  async registerTransaction(cart:any){
    let fd = new FormData();

    for(var key in cart){
      fd.append(key,cart[key]);
    }

    var results = {transaction_id: 0};
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });


    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.post(endpoint.registerTrx, fd, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = {transaction_id: 0};
      });

    return results;
  }
  async TransactionDetail(trx_id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.transactionDetail(trx_id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async LatestPrizesProducts(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results = {};

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.prizeProducts, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = {};
      });

    return results;
  }
  async ListPrizesCategories(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.categoriesPrize, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async prizeDetail(id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.prizeDetail(id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async productDetail(id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: never[] = [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.productDetail(id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async prizeClaim(prize_id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: any= [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.claimPrize(prize_id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async claimsHistory(){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: any= [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.listClaims, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }
  async claimDetail(claim_id: number){
    let token = "";
    await this.storageService.get('access_token').then((value) => {
      token = value;
    });

    var results: any= [];

    const config = {
      headers: { 'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      }
    };

    await axios.get(endpoint.claimDetail(claim_id), config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        results = [];
      });

    return results;
  }

  async claimQRcode(qr_code: object){
    var results = {status: "", message:""};
    const config = {
      headers: { 'Content-Type': 'application/x-wwww-form-urlencoded' }
    };

    let fd = new FormData();
    // @ts-ignore
    fd.append('token', qr_code.token);
    // @ts-ignore
    fd.append('points_amount', qr_code.points_amount);
    // @ts-ignore
    fd.append('reason', qr_code.reason);

    await axios.post(endpoint.qrCodeClaim, fd, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        console.log('axios error', error);
        results = {status:'error', message: 'something went wrong' };
      });

    return results;
  }

  async UpdateProfile(updatedData: {
    password: string;
    full_addr: string;
    l_name: string;
    f_name: string;
    phone_number: string
  }) {
    var results = {status: "", message:""};
    const config = {
      headers: { 'Content-Type': 'application/x-wwww-form-urlencoded' }
    };

    let fd = new FormData();
    // @ts-ignore
    if(updatedData.f_name.length > 0){
      // @ts-ignore
      fd.append('f_name', updatedData.f_name);
    }
    // @ts-ignore
    if(updatedData.l_name.length > 0){
      // @ts-ignore
      fd.append('l_name', updatedData.l_name)
    }
    // @ts-ignore
    if(updatedData.phone_number.length > 0){
      // @ts-ignore
      fd.append('phone_number', updatedData.phone_number)
    }
    // @ts-ignore
    if(updatedData.full_addr.length > 0){
      // @ts-ignore
      fd.append('full_addr', updatedData.full_addr)
    }
    // @ts-ignore
    if(updatedData.password.length > 0){
      // @ts-ignore
      fd.append('password', updatedData.password)
    }

    await axios.post(endpoint.profileUpdate, fd, config)
      .then((response) => {
        results = response.data;
      })
      .catch((error) => {
        console.log('axios error', error);
        results = {status:'error', message: 'something went wrong' };
      });

    return results;
  }
}
