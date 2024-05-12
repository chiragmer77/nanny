// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  demo: false,
  dev: false,
  apiUrl: 'https://nannyaupairapi2.azurewebsites.net/api',
  socketApiUrl: 'wss://nannyaupairapi2.azurewebsites.net/chathub',
  appInsights: {
    instrumentationKey: "",
  },
  encryption:{
    key:"4b4f9a6a5d6e2b9311f8d6bcb3d81b4d",
    iv: "c1f01c0bfb90453a"
  },
  googleClientId: "24219461878-fbcvi5sq346np5v2ml4bh3gd7r5rhtem.apps.googleusercontent.com",
  facebookClientId: "884320413451309"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
