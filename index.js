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

  chooseFnc(message) {
    const from = message.from;

    const functions = {
      text: () => this.sendText(from),
      buttons: () => this.sendButtons(from),
      default: 'Invalid Option!'
    }

    return functions[message.body] ? functions[message.body]() : functions.default;
  }


  start(client) {
    client.onMessage(async (message) => {
      try {
        if (!message.isGroupMsg) {
          const response = await this.chooseFnc(message)
          console.log('response', response)
        }
      } catch (error) {
        return error
      }
    });
  }

  async sendText(from) {
    const response = await this.#client
      .sendText(from, '👋 Hello from venom! This is a basic text exemple.')
      .then(() => {
        return 'success'
      })
      .catch((erro) => {
        throw erro
      });

    return response;
  }

  async sendButtons(from) {
    const buttons = [
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
    ]
    const response = await this.#client
      .sendButtons(from, 'Title: Buttons example', buttons, 'Description: This is a basic buttons exemple.')
      .then(() => 'success')
      .catch((erro) => {
        throw erro
      });

    return response;

  }
}


const sessionName = 'test-session';
const initVenomClient = new InitVenomClient(sessionName);
initVenomClient.init();

