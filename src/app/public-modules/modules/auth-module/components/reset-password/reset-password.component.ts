import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends FormBaseComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  constructor(fb: FormBuilder) {
      super(fb);
  }

  ngOnInit(): void {
    this.createResetPasswordForm();
  }

  createResetPasswordForm = () => {
    this.resetPasswordForm = this.createForm({
      newPassword: ['', []],
      confirmPassword: ['', []],
    });
  }

  onResetPasswordFormSubmit = (form: FormGroup) => {
    if(this.onSubmit(form)){

    }
  }
}
