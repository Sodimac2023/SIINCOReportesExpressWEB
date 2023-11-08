// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tokenStorage: 'token',
  userStorage: 'currentUser',
  version: '1.0', //Version actual del aplicativo que se esta desarrollando
  titleApp: 'Reporte Express', //Titulo que va a tener la aplicacion en los navegadores web
  homePage: '/home', //Pagina de Inicio
  featurePage: '/reporte-express',
  showHeader: true, //Mostrar header
  showMenu: true, //Mostrar Menu
  showFooter: true, //Mostrar footer
  apiSiicoReporteExpress: 'http://10.23.14.175:9156',
  urlAuthentication: 'http://localhost:62607/api/Autentication/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
