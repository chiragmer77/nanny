/*
*Author : Manikandan Maheswaran
*email : m.manikandanmct@gmail.com
*/
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const gapi: any;
@Injectable()
export class GoogleAuthService {
  constructor(private http: HttpClient) { }
  /**
* Calling Google login API and fetching account details.
* @param callback Callback to function
*/
  public authenticateUser(clientId: string, callback: EventEmitter<any>) {
    let auth2: any;
    let result: any;
    gapi?.load('auth2', function () {
      auth2 = gapi
        .auth2
        .init({ client_id: clientId, scope: 'profile email' });
      //Login button reference
      let element: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(element, {}, function (googleUser: { getBasicProfile: () => any; getAuthResponse: () => { (): any; new(): any; id_token: string; }; }) {
        //Getting profile object
        let profile = googleUser.getBasicProfile();
        //Setting data to localstorage.
        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        localStorage.setItem('image', profile.getImageUrl());
        localStorage.setItem('name', profile.getName());
        localStorage.setItem('email', profile.getEmail());
        // Alternatively you can create an object and return it like that - result = {
        // token: googleUser.getAuthResponse().id_token, name: profile.getName(), image:
        // profile.getImageUrl(), email: profile.getEmail(), };
        callback.emit(googleUser);
      }, function (error: any) {
        alert(JSON.stringify(error, undefined, 2));
      });
    });
  }
  /**
* Logout user from Google
* @param callback Callback to function
*/
  userLogout(callback: () => void) {
    //You will be redirected to this URL after logging out from Google.
    let homeUrl = "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah" +
      "/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}