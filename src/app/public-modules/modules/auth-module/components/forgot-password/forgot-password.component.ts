import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends FormBaseComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(fb: FormBuilder, public location: Location) {
      super(fb);
  }

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm = () => {
    this.forgotPasswordForm = this.createForm({
      email: ['', []]
    });
  }

  onForgotPasswordFormSubmit = (form: FormGroup) => {
    if(this.onSubmit(form)){
      
    }
  }

  onBack = () => {
    this.location.back();
  }
}
