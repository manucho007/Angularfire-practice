// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  contentful:{
    spaceId:'tc6oik4u3yvd',
    token:'376bc21df582f83312a9f84e690e40c6a24a0c4eceb09ed8e3e24f5b48661f7d'
  },
  firebase:{
    apiKey: "AIzaSyBA_E91aEqLZMpb4391byjm1WPBg1pXrf0",
    authDomain: "devf-3bee8.firebaseapp.com",
    databaseURL: "https://devf-3bee8.firebaseio.com",
    projectId: "devf-3bee8",
    storageBucket: "devf-3bee8.appspot.com",
    messagingSenderId: "329327565336"
  }
};
