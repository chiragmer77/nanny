import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { JitsiService } from '../../services/jitsi.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit, OnDestroy  {
  @ViewChild('jitsiContainer') jitsiContainer!: ElementRef;
  @Input() displayName: any;
  @Input() meetingId: any;
  @Input() userId: any;
  @Input() signalRService: any;
  @Input() type: any = 'video';
  @Output() close = new EventEmitter<any>();
  private destroy: Subject<any> = new Subject();
  mediaQuery = window.matchMedia('(max-width: 767px)');
  constructor(private jitsiService: JitsiService, private element: ElementRef) { }

  ngOnInit(): void {  
    const domain = 'videochat.nannyaupair.com';
    let options = {
      roomName: this.meetingId,
      width: "100%",
      height: "100%",
      parentNode: this.element.nativeElement,
      userInfo: {
        email: this.userId,
        displayName: this.displayName
      },
      configOverwrite: {
        disableRaiseHand: true,
        prejoinPageEnabled: false,
        startWithAudioMuted: false, 
        startWithVideoMuted: false,
        disableDeepLinking: true,
        mobileAppPromo: false
    },
    interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'fullscreen',
           'hangup', 
            'livestreaming', 'etherpad',
            'videobackgroundblur', 'download',  'mute-everyone','desktop','sharescreen'
          
        ],
        MAIN_TOOLBAR_BUTTONS: ['microphone', 'camera','hangup'], 
        MOBILE_APP_PROMO: false,
        LANG: 'en',

    }
    };
    // if (this.mediaQuery.matches) {
    //   options.configOverwrite.startWithVideoMuted=true;
    //   options.configOverwrite.startWithAudioMuted=true;
    // }
    if(this.type=='audio'){
      options.interfaceConfigOverwrite.TOOLBAR_BUTTONS= [
        'microphone',
       'hangup'      
    ];
    options.configOverwrite.startWithVideoMuted=true;
    }
// Remove 'chat' and 'raisehand' from the TOOLBAR_BUTTONS array to disable them
options.interfaceConfigOverwrite.TOOLBAR_BUTTONS = options.interfaceConfigOverwrite.TOOLBAR_BUTTONS.filter(button => button !== 'chat' && button !== 'raisehand'&& button !== 'invite' && button !== 'security'&& button !== 'recording');
    this.jitsiService.initJitsiMeeting(domain, options,this.signalRService,this.userId,this.type);
    this.jitsiService.closeWindowEvent
      .pipe(
        takeUntil(this.destroy) 
      )
      .subscribe((data: any) => {
        if (data && data.status === 'close') {
          this.jitsiService.closeWindowCompleteFn();
          this.close.emit(data);
        }
      });
  }
   generateGUID(length:any): string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
  
  ngOnDestroy(): void {
  this.jitsiService.dispose();
  this.destroy.next(null);
  this.destroy.complete();
  }
}
