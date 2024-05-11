import { ToastrService } from 'ngx-toastr';
import { GoogleAuthService } from './google-signin.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-sso-login',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css'],
  providers: [GoogleAuthService]
})

export class GoogleSigninComponent implements OnInit{
  imageURL!  : string;
  email! : string;
  name!  : string; 
  token!  : string;
  formValue:any;
  @Output() onSigninSuccess = new EventEmitter();
  @Input() clientId!: string;
  @Input() prefix!: string;
  @Input() 
  set data(val:any){
    this.formValue = val
  }


  constructor(private auth: GoogleAuthService,private toastr: ToastrService){}

  /**
   * Ininitalizing Google Authentication API and getting data from localstorage if logged in
   */
  ngOnInit(){
    //  setTimeout(()=>{this.googleAuthenticate()},1000);
  }

  /**
   * Calling Google Authentication service
   */
  googleAuthenticate(){
    console.log(this.formValue?.value?.usertype)
    if(this.formValue.value.usertype == '' && this.prefix == "Sign up"){
      this.toastr.info('Please Select User Type')
    }else{
      this.auth.authenticateUser(this.clientId, this.onSigninSuccess);
    }
  }
}