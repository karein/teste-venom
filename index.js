/* Versão - ^5.0.7 */
const venom = require('venom-bot');

function start(client) {
  console.log('### client Ok')
}

/* Metódo 1 */
/* v^5.0.7 e v^5.0.11 - Não funcionou 👎 */
// venom
//   .create(
//     'sessionName',
//     (base64Qr) => {
//       console.log('base64Qr', base64Qr)
//     },
//     (statusSession) => {
//       console.log('statusSession', statusSession)
//     }, {
//     headless: true
//     // headless: 'new'
//   }
//   ).then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

/* v^5.0.7 - funcionou 👍*/
/* v^5.0.11 - Não funcionou 👎 */
// venom
//   .create(
//     { session: 'sessionName' },
//     (base64Qr) => {
//       console.log('base64Qr')
//     },
//     (statusSession) => {
//       console.log('statusSession', statusSession)
//     },
//     {
//       headless: true,
//       puppeteerOptions: {
//         ignoreDefaultArgs: ['--disable-extensions']
//       },
//     }
//   ).then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
// });


/* ---------- */

/* Metódo 2 */
/* v^5.0.7 e v^5.0.11 - Não funcionou 👎 */
// venom
//   .create('sessionName', undefined, (statusSession, session) => {
//     console.log('Status Session: ', statusSession);
//     console.log('Session name: ', session);
//   })
//   .then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

/* v^5.0.7 - funcionou 👍*/
/* v^5.0.11 - Não funcionou 👎 */
// venom
//   .create({ session: 'sessionName' }, undefined, (statusSession, session) => {
//     console.log('Status Session: ', statusSession);
//     console.log('Session name: ', session);
//   })
//   .then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });


/* ---------- */

/* Metódo 3 */
/* v^5.0.7 e ^5.0.11- Não funcionou 👎 */
// venom
//   .create('sessionName')
//   .then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

/* v^5.0.7 - funcionou 👍*/
/* ^5.0.11- Não funcionou 👎 */
// venom
//   .create({ session: 'sessionName' })
//   .then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });


/* ---------- */

/* Metódo 4 */
/* Teste feito no Windows com node v18.13.0 */
/* v^5.0.7 - funcionou 👍*/
/* ^5.0.11- Não funcionou 👎 */
// venom
//   .create({
//     session: 'sessionName',
//     headless: true,
//   }).then((client) => start(client))
//   .catch((error) => {
//     console.error('Erro ao criar o cliente do bot:', error);
//   });


/* ---------- */

/* Metódo 5 */
/* v^5.0.7 - funcionou 👍*/
/* ^5.0.11- Não funcionou 👎 */
/* Teste feito no Linux com node v16.17.0 */
venom.create({
  session: 'sessionName',
  headless: 'new',
})
  .then((client) => start(client))
  .catch((error) => {
    console.error('Erro ao criar o cliente do bot:', error);
  });