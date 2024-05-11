// signalr.service.ts
import { Injectable } from "@angular/core";
import { SharedService } from "@app/core";
import { environment } from "@env/environment";
import * as signalR from "@microsoft/signalr";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  constructor(private sharedService: SharedService) {}
  private hubConnection: signalR.HubConnection | undefined;
  private messageReceivedSource = new Subject<any>();
  private blockOrUnBlockedReceivedSource = new Subject<any>();
  private callNotificationSource = new Subject<any>();

  messageReceived$ = this.messageReceivedSource.asObservable();
  blockOrUnBlockedReceived$ = this.blockOrUnBlockedReceivedSource.asObservable();
  callNotification$ = this.callNotificationSource.asObservable();

  startConnection() {
    const authToken = this.sharedService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketApiUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => `${authToken}`, // Provide the token through an accessTokenFactory
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.error("Error while starting connection: " + err));
      
    this.registerOnMessageReceived()
    // this.hubConnection.on('ReceiveMessage', (res) => {
    //   console.log('ReceiveMessage', res);
    // });
  }
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('Connection stopped'))
        .catch((err) => console.log('Error while stopping connection: ' + err));
    }
  }
  addTransferChartDataListener(callback: (data: any) => void) {
    this.hubConnection?.on("ReceiveMessage", (data) => {
      callback(data);
    });
    this.hubConnection?.on("BlockOrUnBlockMessage", (data) => {
      callback(data);
    });
  }

  private registerOnMessageReceived = () => {
    if (this.hubConnection) {
      this.hubConnection.on(
        "ReceiveMessage",
        (content:any) => {
          this.messageReceivedSource.next(content);
        }
      );
      this.hubConnection.on(
        "BlockOrUnBlockMessage",
        (content:any) => {
          this.blockOrUnBlockedReceivedSource.next(content);
        }
      );
      this.hubConnection.on(
        "CallNotificationEvent",
        (content:any) => {
          this.callNotificationSource.next(content);
        }
      );
    }
  };

  invokeServerMethod(methodName: string, args: any[]) {
    this.hubConnection
      ?.invoke(methodName, ...args)
      .catch((err) => console.error(`Error invoking '${methodName}': ${err}`));
  }
}
