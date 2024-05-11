import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import { FormBaseComponent } from '@app/utility/components';
import { UserAuthService } from '../../services';
import { IpServiceService } from '@app/core/services/ip-service.service';
import { SharedService } from '@app/core';
import { removeFieldsFromObj } from '@app/helpers';
import { AccountService } from '../../services/account.service';
import { environment } from '@env/environment';

declare const FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent extends FormBaseComponent implements OnInit {
  // Form variables
  loginForm!: FormGroup;
  googleClientId = environment.googleClientId;
  @Output() onSigninSuccess = new EventEmitter();

  constructor(public router: Router,
    private ip: IpServiceService,
    private sharedService: SharedService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    fb: FormBuilder) {
    super(fb)
  }

  ngOnInit(): void {
    this.initialize();
    this.getIP();
    // this.authService.authState.subscribe((user) => {
    //   console.log(user)
    // });
  }

  initialize = () => {
    this.createLoginForm();
  };

  createLoginForm = () => {
    this.loginForm = this.fb.group({
      city: ['', []],
      country: ['', []],
      ipAddress: ['', []],
      region: ['', []],
      continent: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  };

  getIP = () => {
    this.ip.getIPAddress().subscribe((res: any) => {
      const { ip, country_name, city, region, continent_code } = res;
      this.loginForm.patchValue({
        city,
        country: country_name,
        ipAddress: ip,
        region,
        continent: continent_code
      });
    });
  };

  handleLoginResponse = (response: any) => {
    this.userAuthService.handleAuthResponse(response);
    this.onSearchPage();
    this.loginForm.get('email')?.hasError('required') ? '' : '';
  }

  get f() { return this.loginForm.controls; }

  getErrorEmail() {
    return this.loginForm.get('email')?.hasError('required') ? 'Field is required' :
      this.loginForm.get('email')?.hasError('email') ? 'Invalid Email' :
        '';
  }

  getErrorPassword() {
    return this.loginForm.get('password')?.hasError('required') ? 'Field is required' : '';
  }

  onLoginSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      let params = { ...form.value };
      params.option1 = params.password
      params.option2 = params.ipAddress
      params.option3 = params.country
      params.option4 = params.continent
      params.option5 = params.city
      params.option6 = params.region
      const fieldsToEncrypt = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6'];
      params = this.sharedService.encryptFields(params, fieldsToEncrypt);

      // console.log(params);
      this.userAuthService.logIn(params).subscribe({
        next: (res) => {
          this.handleLoginResponse(res);
        },
        error: (e) => { }
      })
    }
  };

  //page event
  onRegister() {
    this.router.navigate([`/${RouteConstant.REGISTER_ROUTE}`]);
  }

  onForgotPassword() {
    this.router.navigate([`/${RouteConstant.FORGOT_PASSWORD_ROUTE}`]);
  }

  onSearchPage() {
    this.router.navigate([`/${RouteConstant.SEARCH}`]);
  }

  get formControls() {
    return this.loginForm.controls;
  }

  async signInWithFB() {
    let email = ""
    let that = this;
    await this.accountService.login()
      .subscribe(async (res) => {
        var url = '/me?fields=email';
        await FB.api('/me', { fields: 'email' }, async function (response: any) {
          email = response.email
          console.log("email", email)
          that.loginForm.value.LoginType = 'Facebook';
          that.loginForm.value.email = email;
          that.loginForm.value.profilepictureurl = email;
          await FB.api('/me',{ fields: 'picture{url}' }, function (profile: any) {
            console.log(profile)
            that.loginForm.value.profilepictureurl = profile.data?.url;
            that.socialSignin()
          });
        });
      });

  }

  onGoogleSigninSuccess(google: any) {
    console.log("Sign in with Google button clicked...", google)
    let profile = google.getBasicProfile();
    this.loginForm.value.LoginType = 'Google';
    this.loginForm.value.email = profile.getEmail();
    this.loginForm.value.profilepictureurl = profile.getImageUrl();

    this.socialSignin()
  }

  socialSignin() {
    let params = { ...this.loginForm.value }
    params = removeFieldsFromObj(params, ['password']);
    params.option2 = params.ipAddress
    params.option3 = params.country
    params.option4 = params.continent
    params.option5 = params.city
    params.option6 = params.region

    const fieldsToEncrypt = ['option2', 'option3', 'option4', 'option5', 'option6'];
    params = this.sharedService.encryptFields(params, fieldsToEncrypt);
    console.log(params)
    this.userAuthService.logIn(params).subscribe({
      next: (res) => {
        console.log(res)
        // this.handleLoginResponse(res);
      },
      error: (e) => { }
    })
  }
}
