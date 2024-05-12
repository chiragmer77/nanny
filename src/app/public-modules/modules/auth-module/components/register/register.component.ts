import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstant, UserTypeEnum, userTypes } from '@app/helpers/constants';
import { PasswordValidator } from '@app/helpers/validators/password-validator';
import { FormBaseComponent } from '@app/utility/components';
import { UserAuthService } from '../../services';
import { removeFieldsFromObj } from '@app/helpers';
import { IpServiceService } from '@app/core/services/ip-service.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/core';
import { AccountService } from '../../services/account.service';
import { environment } from '@env/environment';
// import { SocialAuthService } from "@abacritt/angularx-social-login";

declare const FB: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormBaseComponent implements OnInit {
  // Form variables
  registerForm!: FormGroup;
  userTypeList = userTypes;
  isSubmitted: boolean = false;
  googleClientId = environment.googleClientId;

  //   constructor(private ip:IpServiceService){}
  //   title = 'DemoApp';
  //   ipAddress:string;
  // ngOnInit()
  //   {
  //     this.getIP();
  //   }
  //   getIP()
  //   {
  //     this.ip.getIPAddress().subscribe((res:any)=>{
  //       this.ipAddress=res.ip;
  //     });
  //   }

  constructor(
    public router: Router,
    private ip: IpServiceService,
    private userAuthService: UserAuthService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    // private authService: SocialAuthService,
    fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
    this.getIP();
    // this.authService.authState.subscribe((user) => {
    //   if (user) {
    //     console.log(user)
    //     if (this.registerForm.value.usertype) {


    //     } else {
    //       this.toastr.info('Please Select User Type')
    //     }

    //   }
    // });
  }

  initialize = () => {
    this.createRegistrationForm();
  };

  createRegistrationForm = () => {
    this.registerForm = this.fb.group(
      {
        city: ['', []],
        country: ['', []],
        ipAddress: ['', []],
        region: ['', []],
        continent: ['', []],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^.{5,}$/)]],
        email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
        password: ['', [Validators.required, Validators.pattern(/^.{5,}$/)]],
        usertype: ['', [Validators.required]],
      },
      {
        validators: PasswordValidator.validateTwoPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  };
  get f() { return this.registerForm.controls; }
  getIP = () => {
    this.ip.getIPAddress().subscribe((res: any) => {
      const { ip, country_name, city, region, continent_code } = res;
      this.registerForm.patchValue({
        city,
        country: country_name,
        ipAddress: ip,
        region,
        continent: continent_code
      });
    });
  };

  onRegisterSubmit = (form: FormGroup) => {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let params = { ...form.value };
    params = removeFieldsFromObj(params, ['confirmPassword']);
    params.logintype = "Email"
    params.option1 = params.password
    params.option2 = params.ipAddress
    params.option3 = params.country
    params.option4 = params.continent
    params.option5 = params.city
    params.option6 = params.region
    const fieldsToEncrypt = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6'];
    params = this.sharedService.encryptFields(params, fieldsToEncrypt);

    this.registerUser(params).subscribe({
      next: (res) => {
        this.userAuthService.handleRegisterResponse(res);
        this.ShowMessage();
      },
      error: (e: any) => console.error(e),
    });

  };

  ShowMessage() {
    this.toastr.info('Please provide details', '', {
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    });
  }

  //page event
  onLogin() {
    this.router.navigate([`/${RouteConstant.LOGIN_ROUTE}`]);
  }

  // API Calls
  registerUser = (params: any = {}) => {
    return this.userAuthService.registerUser(params);
  };

  get formControls() {
    return this.registerForm.controls;
  }

  async signUpWithFB() {
    let email = ""
    let that = this;
    if(this.registerForm.value.usertype){
      this.accountService.login()
        .subscribe(async (res) => {
          // var userId = res.userID;
          console.log("res", res);
          this.registerForm.value.token = res.accessToken;
          await FB.api('/me', { fields: 'email' }, async function (response: any) {
            console.log(response)
            email = response.email;
            that.registerForm.value.logintype = 'Facebook';
            that.registerForm.value.email = email;
            // that.registerForm.value.password = '12345678';
            // var profileUrl = `${userId+'/picture?type=large'}`
            // console.log(profileUrl)
            // await FB.api(profileUrl, function (profile: any) {
            //   console.log(profile)
            //   that.registerForm.value.profilepictureurl = profile.data?.url;
            //   that.socialSignup()
            // });
            await FB.api('/me',{ fields: 'picture{url}' }, function (profile: any) {
              console.log(profile)
              that.registerForm.value.profilepictureurl = profile.picture?.data?.url;
              // that.socialSignup()
            });

            await FB.api('/me',{ fields: 'id' }, function (id: any) {
              console.log("id>>>>>>>>>",id)
              that.socialSignup()
            });
          });
        });
    }else{
      this.toastr.info('Please Select User Type')
    }
    
  }

  onGoogleSigninSuccess(google: any) {
    console.log("Sign in with Google button clicked...", google)
    let profile = google.getBasicProfile();
    this.registerForm.value.logintype = 'Google';
    this.registerForm.value.email = profile.getEmail();
    this.registerForm.value.profilepictureurl = profile.getImageUrl();
    this.registerForm.value.token = google.getAuthResponse().id_token;

    this.socialSignup()
  }

  socialSignup() {
    let params = { ...this.registerForm.value }
    console.log("params>>>>>>>>>>>>.",params)
    params = removeFieldsFromObj(params, ['confirmPassword', 'password']);
    
    params.option2 = params.ipAddress
    params.option3 = params.country
    params.option4 = params.continent
    params.option5 = params.city
    params.option6 = params.region

    const fieldsToEncrypt = ['option2', 'option3', 'option4', 'option5', 'option6'];
    params = this.sharedService.encryptFields(params, fieldsToEncrypt);
    console.log(params)
    this.registerUser(params).subscribe({
      next: (res) => {
        console.log(res)
        this.userAuthService.handleRegisterResponse(res);
        this.ShowMessage();
      },
      error: (e: any) => console.error(e),
    });
  }

}
