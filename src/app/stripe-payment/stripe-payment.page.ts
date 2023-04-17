import {Component, OnInit} from '@angular/core';
import {
  ApplePayEventsEnum,
  GooglePayEventsEnum,
  PaymentFlowEventsEnum,
  PaymentSheetEventsEnum,
  Stripe
} from "@capacitor-community/stripe";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {first, lastValueFrom} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {musicalNote} from "ionicons/icons";
import {Platform} from "@ionic/angular";
import {CartManagerService} from "../services/cart-manager.service";
import {ApiCallService} from "../services/api-call.service";

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.page.html',
  styleUrls: ['./stripe-payment.page.scss'],
})
export class StripePaymentPage implements OnInit {
  cart: any = [];
  showGooglePay = false;
  showApplePay = false;
  data: any = {
    'name': "",
    'email': "",
    'amount': 0,
    'currency': ''
  };
  subtotal: number = 0.00;
  constructor( private router: Router,
               private storageService: StorageService,
               private http: HttpClient,
               private route: ActivatedRoute,
               private platform: Platform,
               private cm: CartManagerService,
               private acs: ApiCallService) {
    this.subtotal = parseInt(<string>this.route.snapshot.paramMap.get('subtotal'));
  }
  httpPost(body: any) {
    return this.http.post<any>(environment.main_server + 'payment-sheet', body).pipe(first());
  }
  async ngOnInit() {
    await this.cm.listProducts().then((cart) => {this.cart = cart;})

    this.storageService.get('my_data').then((my_data) => {
      this.data = {
        'name': my_data.f_name + " " + my_data.l_name,
        'email': my_data.email,
        'amount': this.subtotal * 100,
        'currency': environment.stripe.currency,
        'user_id': my_data.user_id,
        'cart': JSON.stringify(this.cart)
      }
      Object.assign(this.data.cart, this.cart);

      console.log(this.data);


    });

    if(this.platform.is('android')){
      this.showGooglePay = true;
    }else if (this.platform.is("ios")){
      this.showApplePay = true;
    } else {
      this.showGooglePay = false;
      this.showApplePay = false;
    }

    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey
    })
  }

  async paymentSheet() {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log("PaymentSheetEventsEnum.Completed");
      })

      const data = new HttpParams({
        fromObject: this.data
      })

      const data$ = this.http.post<{
        paymentIntent: string,
        ephemeralKey: string;
        customer: string;
      }>(environment.main_server + 'payment-sheet', data).pipe(first());

      const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

      console.log("paymentIntent: ", paymentIntent);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: environment.stripe.merchant_name
      });


      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if(result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.acs.registerTransaction(this.data);
        this.cm.clearCart();
        this.router.navigate(['/payment/ok'])
      } else {
        this.router.navigate(['/payment/ko'])
        console.log('err', result);
      }

    } catch(e){
      console.log("Exception: ", e);
    }
  }

  async paymentFlow(){
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });

    const data = new HttpParams({
      fromObject: this.data
    });

    const data$ = this.http.post<{
      paymentIntent: string;
      ephemeralKey: string;
      customer: string;
    }>(environment.main_server + 'payment-sheet', data).pipe(first());

    const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$);

    await Stripe.createPaymentFlow({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: environment.stripe.merchant_name
    });

    const presentResult = await Stripe.presentPaymentFlow();
    console.log('presentResult: ', presentResult);

    const confirmResult = await Stripe.confirmPaymentFlow();
    console.log('confirmResult: ', confirmResult);

    if(confirmResult.paymentResult === PaymentFlowEventsEnum.Completed){
      // YAHOO ! WE GOT MONEY
      console.log("Payment success", confirmResult);
    } else {
      // FUCK!SHIT HAPPENS
      console.log("Something went wrong", confirmResult);
    }
  }

  async applePay(){
    const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
    if(isAvailable === undefined){
      return;
    }

    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log("Apple Pay Available");
    })

    const data = new HttpParams({
      fromObject: this.data
    });

    const data$ = this.http.post<{
      paymentIntent: string;
    }>(environment.main_server + 'payment-sheet', data).pipe(first());

    const { paymentIntent } = await lastValueFrom(data$);
    await Stripe.createApplePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [{
        label: environment.stripe.merchant_name,
        amount: this.subtotal
      }],
      merchantIdentifier: environment.stripe.merchant_name,
      countryCode: environment.stripe.countryCode,
      currency: environment.stripe.currency,
    });

    // Present Apple Pay
    const result = await Stripe.presentApplePay();
    if (result.paymentResult === ApplePayEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
      console.log(this.splitAndJoin(paymentIntent), result);
    } else {
      console.log("Something wrong", result);
    }

  }
  splitAndJoin(paymentIntent: string) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
  async googlePay() {
    // Check to be able to use Google Pay on device
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      // disable to use Google Pay
      return;
    }

    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });

    // const data = new HttpParams({
    //   fromObject: this.data
    // });

    // Connect to your backend endpoint, and get paymentIntent.
    // const data$= this.http.post<{
    //   paymentIntent: string;
    // }>(environment.api + 'payment-sheet', data).pipe(first());

    const data$ = this.httpPost(this.data);

    const { paymentIntent } = await lastValueFrom(data$);

    // Prepare Google Pay
    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,

      // Web only. Google Pay on Android App doesn't need
      paymentSummaryItems: [{
        label: environment.stripe.merchant_name,
        amount: this.subtotal
      }],
      merchantIdentifier: 'merchant.com.getcapacitor.stripe',
      countryCode: environment.stripe.countryCode,
      currency: environment.stripe.currency,
    });

    // Present Google Pay
    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
      console.log(this.splitAndJoin(paymentIntent), result);
    } else {
      console.log('wrong', result);
    }
  }
}

