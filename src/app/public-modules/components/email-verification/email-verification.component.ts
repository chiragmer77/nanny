import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core';
import { UserAuthService } from '@app/public-modules/modules/auth-module/services';
@Component({
  selector: 'app-email-verification',
  standalone: false,
  // imports: [MatIconModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
 
  protected verifyMessage : boolean = false;
  constructor(private route: ActivatedRoute,  private commonService: CommonService, ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.commonService.verifyEmail({id}).subscribe(()=>{
        this.verifyMessage=true;
    });
  }


}
