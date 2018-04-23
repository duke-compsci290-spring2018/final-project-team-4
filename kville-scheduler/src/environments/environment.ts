// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAIyT1Uzas9K0oAKNBXMej7sTW_dXJRvZk",
    authDomain: "k-ville-schedule-builder.firebaseapp.com",
    databaseURL: "https://k-ville-schedule-builder.firebaseio.com",
    projectId: "k-ville-schedule-builder",
    storageBucket: "k-ville-schedule-builder.appspot.com",
    messagingSenderId: "123382215531"
  }
};
