import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CallType } from '../models/callType';

declare var JitsiMeetExternalAPI: any; // Declare Jitsi API

@Injectable({
  providedIn: 'root',
})
export class JitsiService {
  private api: any;
  startTime: any;
  endTime: any;
  signalRService: any;
  userId: any;
  type:any='video'
  durationInSeconds: number = 0;
  private closeWindow = new BehaviorSubject<any>(null);
  closeWindowEvent = this.closeWindow.asObservable();
  private meetingInfo = new BehaviorSubject<any>(null);
  meetingInfoEvent = this.closeWindow.asObservable();
  constructor() {}

  // Initialize Jitsi Meeting
  initJitsiMeeting(
    domain: string,
    options: any,
    signalRService: any,
    userId: any,
    type:any
  ): void {
    this.signalRService = signalRService;
    this.userId = userId;
    this.type=type;
    this.api = new JitsiMeetExternalAPI(domain, options);

    this.api.addEventListener('videoConferenceLeft', (event: any) => {
      if (this.userId) {
        this.userId=null;
        this.endTime = new Date();
        this.calculateDuration();

      }
      this.api.executeCommand('endConference');
      this.closeWindowFn({ status: 'close', duration: this.durationInSeconds });
    });
    this.api.addEventListener('participantLeft', (event: any) => {
      if (this.userId) {
        this.userId=null;
        this.endTime = new Date();
        this.calculateDuration();
      }
      this.api.executeCommand('endConference');
      this.closeWindowFn({ status: 'close', duration: this.durationInSeconds });
    });
    this.api.addListener('participantJoined', (event: any) => {});
    this.api.addEventListener('videoConferenceJoined', (event: any) => {
      let participants = this.api.getParticipantsInfo();
      if (participants?.length == 1) {
        if(this.type=='video'){
        this.signalRService.invokeServerMethod('SendCallNotificationMessage', [
          this.userId,
          CallType.Incoming,
        ]);
      }
      else{
        this.signalRService.invokeServerMethod('SendCallNotificationMessage', [
          this.userId,
          CallType.AudioOnly,
        ]);
      }
      } else {
        this.userId = null;
      }
      setTimeout(() => {
        this.api.executeCommand('subject', 'Nanny-Aupair Meeting');
      }, 500);
      if (this.userId) {
        this.startTime = new Date();
      }
    });
  }
  calculateDuration() {
    if (this.startTime && this.endTime) {
      const duration = this.endTime - this.startTime;
      this.durationInSeconds = Math.floor((duration / 1000));
    }
  }
  dispose() {
    this.api.dispose();
  }
  closeWindowFn(data: any) {
    this.closeWindow.next(data);
  }
  meetinngInfoFn(data: any) {
    this.meetingInfo.next(data);
  }
  closeWindowCompleteFn() {
    this.closeWindow.next(null);
  }
}
