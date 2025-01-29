import { create } from 'venom-bot';

export class InitVenomClient {
  #sessionName;
  #client;

  constructor(sessionName) {
    this.#sessionName = sessionName
  }

  async init() {
    create({ session: this.#sessionName })
      .then((client) => {
        this.#client = client
        this.start(client)
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  chooseFnc(message) {
    const fnc = message.body;
    const from = message.from;

    const functions = {
      text: () => this.sendText(from),
      image: () => this.sendImage(from),
      buttons: () => this.sendButtons(from),
      default: 'Invalid Option!'
    }

    return functions[fnc] ? functions[fnc]() : functions.default;
  }

  /*
    Recebe uma mensagem e retorna a função equivalente.
    Ex: Escuta a mensagem 'text' e chama a função 'sendText', que envia um texto simples.
  */
  start(client) {
    client.onMessage(async (message) => {
      try {
        if (!message.isGroupMsg) {
          await this.chooseFnc(message)
        }
      } catch (error) {
        throw error
      }
    });
  }

  async sendText(to, text) {
    const message = text || '👋 Hello from venom! This is a basic text exemple.';

    const response = await this.#client
      .sendText(to, message)
      .then(() => {
        return 'success'
      })
      .catch((erro) => {
        throw erro
      });

    return response;
  }

  /* Visíveis apenas em apenas WhatsApp web e IOS */
  async sendButtons(to, buttons) {
    const buttonsArr = buttons || [
      {
        "buttonText": {
          "displayText": "Text of Button 1"
        }
      },
      {
        "buttonText": {
          "displayText": "Text of Button 2"
        }
      }
    ];

    const response = await this.#client
      .sendButtons(to, 'Title: Buttons example', buttonsArr, 'Description: This is a basic buttons exemple.')
      .then(() => 'success')
      .catch((erro) => {
        throw erro
      });

    return response;

  }

  /* Necessário alteração no node_modules (V<=^5.0.21) */
  async sendImage(to, image, imageName, captionText) {
    const img = image || './assets/sad_christmas_tree.jpg';
    const imgName = imageName || 'Image name';
    const captionTxt = captionText || 'Caption text';

    const response = await this.#client
      .sendImage(
        to,
        img,
        imgName,
        captionTxt
      )
      .then(() => 'success')
      .catch((erro) => {
        console.log('erro', erro)
        throw erro
      });

    return response
  }
}


/*

  // Versão - ^5.0.7 
  const venom = require('venom-bot');

  function start(client) {
    console.log('### client Ok')
  }

  // Metódo 1 
  // Não funcionou 👎 
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

  // funcionou 👍
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


  // ---------- 

  // Metódo 2 
  // Não funcionou 👎
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

  // funcionou 👍
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


  // ---------- 
  // Metódo 3 
  // Não funcionou 👎 
  // venom
  //   .create('sessionName')
  //   .then((client) => {
  //     start(client);
  //   })
  //   .catch((erro) => {
  //     console.log(erro);
  //   });

  // funcionou 👍
  // venom
  //   .create({ session: 'sessionName' })
  //   .then((client) => {
  //     start(client);
  //   })
  //   .catch((erro) => {
  //     console.log(erro);
  //   });


  // ---------- 

  // Metódo 4 
  // funcionou 👍
  // venom
  //   .create({
  //     session: 'sessionName',
  //     headless: true,
  //   }).then((client) => start(client))
  //   .catch((error) => {
  //     console.error('Erro ao criar o cliente do bot:', error);
  //   });

  // ---------- 

  // Metódo 5 

  // (async () => {
  //   try {
  //     await venom.create(
  //       'sessionName',
  //       (base64Qr, _, attempts) => {
  //         console.log('attempts', attempts)
  //       },
  //       (statusSession) => {
  //         console.log('statusSession', statusSession);
  //       }, {
  //       folderNameToken: 'tokens',
  //       disableWelcome: true,
  //       waitForLogin: true,
  //       disableSpins: true,
  //       refreshQR: 15000,
  //       autoClose: 45000,
  //     }
  //     )
  //   } catch (error) {
  //     console.log("LOG:ERROR-[Initialize]", error)
  //   }
  // })();


  async function init(sessionName) {
    console.log('#### sessionName', sessionName)

    const browserSessionToken = null;

    try {
      const client = await venom.create(
        sessionName,
        // { session: sessionName },
        (base64Qr, asciiQR, attempts, urlCode) => {
          console.log('\n', '...QR CODE ...', attempts, urlCode, '\n')
          this.socket && this.socket.emit('qrCodeServer', { qrBase64: base64Qr, attempts: attempts })

          const attemptes = attempts;
          const qrcode = base64Qr;
          const state = "QRCODE";
        },
        // statusFind
        (statusSession, sess) => {
          const status = statusSession;
          console.log('#### status=' + statusSession + ' sessionName=' + sess);
          // const state = state != 'CONNECTED' ? statusSession : state;
        }, {
        folderNameToken: 'tokens',
        disableWelcome: true,
        waitForLogin: true,
        disableSpins: true,
        refreshQR: 15000,
        autoClose: 45000,
      },
        browserSessionToken
      )

      return client;
    } catch (error) {
      console.log("LOG:ERROR-[Initialize]", error)
      return error
    }
  }

  (async () => {
    await init('nome-da-sessao');
  })();
*/