/* Versão - ^5.0.7 */
const venom = require('venom-bot');

function start(client) {
  console.log('### client Ok')
}

/* Metódo 1 */
/* Não funcionou 👎 */
// venom
//   .create(
//     'sessionName',
//     (base64Qr) => {
//       console.log('base64Qr', base64Qr)
//     },
//     (statusSession) => {
//       console.log('statusSession', statusSession)
//     }
//   ).then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

/* funcionou 👍*/
// venom
//   .create(
//     { session: 'sessionName' },
//     (base64Qr) => {
//       console.log('base64Qr')
//     },
//     (statusSession) => {
//       console.log('statusSession', statusSession)
//     }
//   ).then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });


/* ---------- */

/* Metódo 2 */
/* Não funcionou 👎 */
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

/* funcionou 👍*/
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
/* Não funcionou 👎 */
// venom
//   .create('sessionName')
//   .then((client) => {
//     start(client);
//   })
//   .catch((erro) => {
//     console.log(erro);
//   });

/* funcionou 👍*/
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
/* funcionou 👍*/
// venom
//   .create({
//     session: 'sessionName',
//     headless: true,
//   }).then((client) => start(client))
//   .catch((error) => {
//     console.error('Erro ao criar o cliente do bot:', error);
//   });

