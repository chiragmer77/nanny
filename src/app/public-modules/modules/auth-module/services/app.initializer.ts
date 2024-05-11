import { finalize } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from '@env/environment';


declare const FB: any;

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the angular app
        (window as any)['fbAsyncInit'] = function () {
            FB.init({
                appId: environment.facebookClientId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // auto login to the api if already logged in with facebook
            FB.getLoginStatus(({ authResponse }: { authResponse: any }) => {
                if (authResponse) {
                    resolve(null)
                } else {
                    resolve(null);
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js: any;
            var fjs: any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}