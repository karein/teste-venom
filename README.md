Funções simples para teste do Venom-bot.

## Versões utilizadas

- ^5.0.7
- ^5.0.11

## Rodar o projeto - comandos

1. npm install
2. node index.js

## instalar versão específica a lib

- npm i venom-bot@\<version\>

## Referências

- [Building a REST API with Node and Express
  ](https://stackabuse.com/building-a-rest-api-with-node-and-express/)
- [How to create a REST API with Node.js and Express](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)
- [Criando um WhatsApp Bot para o Woodstock de 1969 ☮️ — NodeJS](https://giovanicassiano.medium.com/criando-um-whatsapp-bot-para-o-woodstock-de-1969-%EF%B8%8F-nodejs-64318d67f5cd)
  - Repository: https://github.com/giovaninogueira/chat-bot-aula/tree/main
    <br></br>

## Modificações

"Gambiarras" para cada versão.  
Alterações que funcionaram para mim (em relação ao erro `Error no open browser....`) usando WhatsApp pessoal no <u>**Linux**</u> e <u>**Windows**</u>.

### 5.0.6

No arquivo **node_modules/venom-bot/dist/controllers/browser.js** na função **`folderSession`**:

```javascript
/* add */
const sessionName = options.session || ""

/* comment (const folderSession before) */
// const folderSession = path.join(path.resolve(process.cwd(), options.mkdirFolderToken, options.folderNameToken, options.session));

/* modify (const folderSession after) */
const folderSession = path.join(
  path.resolve(
    process.cwd(),
    options.mkdirFolderToken,
    options.folderNameToken,
    sessionName
  )
)
```

### 5.0.7, 5.0.11 & 5.0.13

No arquivo **node_modules/venom-bot/dist/controllers/browser.js** na função **`initBrowser`**:

```javascript
/* modify */
const launchOptions = {
  /* (headless after) */
  headless: true,
  /* (headless before) */
  // headless: options.headless,
  devtools: options.devtools,
  args:
    (_d = options.browserArgs) !== null && _d !== void 0
      ? _d
      : puppeteer_config_1.puppeteerConfig.chromiumArgs,
  ...options.puppeteerOptions,
  ...extras,
}
```

### 5.0.13

Seems to work fine **only** with this specific function format 😕  
(with this format isn't necessary to change node modules function)

```javascript
venom
  .create({
    session: "sessionName",
    headless: true,
  })
  .then(client => start(client))
  .catch(error => {
    console.error("Erro ao criar o cliente do bot:", error)
  })
```
