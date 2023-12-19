Repositório com funções básicas do Venom-bot.  
Projeto pode ser clonado e implementado para testar funções do seu interesse 👍.

## Versões utilizadas

- ^5.0.7
- ^5.0.11
- ^5.0.13
- ^5.0.21

## Rodar o projeto - comandos

1. npm install
2. npm run dev

## instalar versão específica a lib

- npm i venom-bot@\<version\>

## Referências

- [Venom-bot](https://github.com/orkestral/venom)
- [Building a REST API with Node and Express
  ](https://stackabuse.com/building-a-rest-api-with-node-and-express/)
- [How to create a REST API with Node.js and Express](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)
- [Criando um WhatsApp Bot para o Woodstock de 1969 ☮️ — NodeJS](https://giovanicassiano.medium.com/criando-um-whatsapp-bot-para-o-woodstock-de-1969-%EF%B8%8F-nodejs-64318d67f5cd)
  - Repository: https://github.com/giovaninogueira/chat-bot-aula/tree/main
    <br></br>

## Modificações

"Gambiarras" para cada versão.  
Alterações que funcionaram para mim usando WhatsApp pessoal no <u>**Linux**</u> e <u>**Windows**</u>.

### 5.0.6

Erro: `Error no open browser....`  
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

<br/>

### 5.0.7, 5.0.11 & 5.0.13

Erro: `Error no open browser....`  
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

<br/>

### 5.0.13

Erro: `Error no open browser....`  
Using this format isn't necessary to change node_modules function.

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

<br></br>

### 5.0.21

SendImage retornando erro:

```javascript
  erro {
    me: {
      [...]
    },
    to: {
      [...]
    },
    erro: true,
    text: 'Error to processFiles',
    status: 404
  }
```

Issues references:

- https://github.com/orkestral/venom/issues/2482
- https://github.com/orkestral/venom/issues/2485

No arquivo **node_modules/venom-bot/dist/lib/wapi/wapi.js** alterar:

```javascript
/* <!-- Before --> */
return (
  await n.processAttachments(
    "0.4.613" === Debug.VERSION ? t : t.map(e => ({ file: e })),
    e,
    1 // antes
  ),
  n
)
```

```javascript
/*<!-- After -->*/
return (
  await n.processAttachments(
    "0.4.613" === Debug.VERSION ? t : t.map(e => ({ file: e })),
    e,
    e // depois
  ),
  n
)
```
