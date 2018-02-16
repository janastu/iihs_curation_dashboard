// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  protocol:'http://',
  //host:'localhost',
  host:'192.168.1.30',
  couchdbusername: 'admin', //couchdb username
  couchdbpassword: 'admin', //couchdb password
  couchdbport: '5984', //couchdb host
  superloginport: '3001', //Super login server url(UI url)
  feedParserport: '3000', //Feed Parser Service URL

};
 