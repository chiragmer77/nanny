import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@app/core';
import { reasonTypeData } from '@app/helpers';
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent extends FormBaseComponent implements OnInit {
  // Form variables
  contactUsForm!: FormGroup;
  reasonTypeList = reasonTypeData;

  constructor(
    public router: Router,
    private commonService: CommonService,
    fb: FormBuilder
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    this.createContactUsForm();
  };

  createContactUsForm = () => {
    this.contactUsForm = this.fb.group({
      reasonType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  };

  handleContactUsResponse = (res: any) => {
    this.createContactUsForm();
  };

  onContactUsSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this.commonService.contactUsApi(params).subscribe({
        next: (res) => {
          this.handleContactUsResponse(res);
        },
        error: (e) => {},
      });
    }
  };

  get formControls() {
    return this.contactUsForm.controls;
  }
}
