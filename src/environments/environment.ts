// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

 dbprotocol:'http://',
 dbhost:'localhost:5984',
 dbPort:'5984',
 dbuser:'admin',
 dbpassword:'admin',
 authHost:'localhost:3001',
 authPort:'3001',

 feedParserHost:'localhost:3600',

 feedParserPort:'3600' 


 /*dbprotocol:'http://',
 dbhost:'localhost:5984',
 dbPort:'5984',
 dbuser:'admin',
 dbpassword:'admin',
 authHost:'localhost:3001',
 authPort:'3000',
 feedParserHost:'localhost:3000',

 feedParserPort:'3500'
*/

 


};
