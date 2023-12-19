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