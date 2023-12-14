import { create } from 'venom-bot';

export class InitVenomClient {
  #sessionName;
  #client;

  constructor(sessionName) {
    this.#sessionName = sessionName
  }

  init() {
    create({ session: this.#sessionName })
      .then((client) => {
        this.#client = client
        this.start(client)
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  start(client) {
    client.onMessage((message) => {
      if (message.body === 'Hi' && !message.isGroupMsg) {
        client
          .sendText(message.from, 'Welcome Venom 🕷')
          .then((result) => {
            // console.log('Result: ', result); //return object success
            return 'success'
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
            return erro
          });
      }
    });
  }
}


const sessionName = 'test-session';
const initVenomClient = new InitVenomClient(sessionName);
initVenomClient.init();

