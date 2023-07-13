const venom = require('venom-bot');

function start(client) {
  console.log('### client Ok')
}

/* session argument */

  /* Metódo 1 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create(
    //     { session: 'sessionName' },
    //     (base64Qr) => {
    //       console.log('base64Qr', base64Qr)
    //     },
    //     (statusSession) => {
    //       console.log('statusSession', statusSession)
    //     } 
    //     // ,{
    //     //   waitForLogin: true,
    //     //   headless: true,
    //     //   browserArgs: ['--no-sandbox']
    //     //   // ,puppeteerOptions: {
    //     //   //   ignoreDefaultArgs: ['--disable-extensions']
    //     //   // },
    //     // }
    //   ).then((client) => {
    //     start(client);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });

  /* ---------- */

  /* Metódo 2 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    // .create({session: 'sessionName'}, undefined, (statusSession, session) => {
    //     console.log('Status Session: ', statusSession);
    //     console.log('Session name: ', session);
    //   }
    //   // ,{
    //   //   waitForLogin: true,
    //   //   headless: true,
    //   //   // browserArgs: ['--no-sandbox'],
    //   //   // puppeteerOptions: {
    //   //   //   ignoreDefaultArgs: ['--disable-extensions']
    //   //   // },
    //   // }
    // )
    // .then((client) => {
    //   start(client);
    // })
    // .catch((erro) => {
    //   console.log(erro);
    // });

  /* ---------- */

  /* Metódo 3 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create({session: 'sessionName'}
    //     // ,null, null,
    //     // {
    //     //   waitForLogin: true,
    //     //   headless: true
    //     //   // ,browserArgs: ['--no-sandbox'],
    //     //   // puppeteerOptions: {
    //     //   //   ignoreDefaultArgs: ['--disable-extensions']
    //     //   // },
    //     // }
    //   )
    //   .then((client) => {
    //     start(client);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });

  /* ---------- */

  /* Metódo 4 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    // .create({
    //   session: 'sessionName',
    //   // headless: true,
    //   // waitForLogin: true,
    //   // browserArgs: ['--no-sandbox'],
    //   // puppeteerOptions: {
    //   //   ignoreDefaultArgs: ['--disable-extensions']
    //   // }
    // }).then((client) => start(client))
    // .catch((error) => {
    //   console.error('Erro ao criar o cliente do bot:', error);
    // });

/* no session argument */

  /* Metódo 1 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create(
    //     'sessionName',
    //     (base64Qr) => {
    //       console.log('base64Qr', base64Qr)
    //     },
    //     (statusSession) => {
    //       console.log('statusSession', statusSession)
    //     } 
    //     // ,{
    //     //   waitForLogin: true,
    //     //   headless: true,
    //     //   browserArgs: ['--no-sandbox'],
    //     //   puppeteerOptions: {
    //     //     ignoreDefaultArgs: ['--disable-extensions']
    //     //   },
    //     // }
    //   ).then((client) => {
    //     start(client);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });

  /* ---------- */

  /* Metódo 2 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11- Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create( 'sessionName', undefined, (statusSession, session) => {
    //       console.log('Status Session: ', statusSession);
    //       console.log('Session name: ', session);
    //     }
    //     // ,{
    //     //   waitForLogin: true,
    //     //   headless: true,
    //     //   // browserArgs: ['--no-sandbox'],
    //     //   // puppeteerOptions: {
    //     //   //   ignoreDefaultArgs: ['--disable-extensions']
    //     //   // },
    //     // }
    //   )
    //   .then((client) => {
    //     start(client);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });

  /* ---------- */

  /* Metódo 3 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create('sessionName'
    //     // ,null, null,
    //     // {
    //     //   waitForLogin: true,
    //     //   headless: true,
    //     //   // browserArgs: ['--no-sandbox'],
    //     //   // puppeteerOptions: {
    //     //   //   ignoreDefaultArgs: ['--disable-extensions']
    //     //   // },
    //     // }
    //   )
    //   .then((client) => {
    //     start(client);
    //   })
    //   .catch((erro) => {
    //     console.log(erro);
    //   });

  /* ---------- */

  /* Metódo 4 */
    /* ^5.0.7 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    /* ^5.0.11 - Não funcionou com a pasta tokens 👎 - funcionou sem a pasta tokens 👍 */
    // venom
    //   .create('sessionName').then((client) => start(client))
    //   .catch((error) => {
    //     console.error('Erro ao criar o cliente do bot:', error);
    //   });


