import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call-notification-dialog',
  templateUrl: './call-notification-dialog.component.html',
  styleUrls: ['./call-notification-dialog.component.scss']
})
export class CallNotificationDialogComponent  implements AfterViewInit {
  @ViewChild('callingSound') callingSound!: ElementRef<HTMLAudioElement>;;
  constructor(
    public dialogRef: MatDialogRef<CallNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  
    ngAfterViewInit() {
      this.playCallingSound();
    }
  
    playCallingSound() {
      if (this.callingSound && this.callingSound.nativeElement) {
        const audio = this.callingSound.nativeElement;
        audio.loop = true;
        audio.play().catch(error => console.error('Error playing sound:', error));
      }
    }
}
