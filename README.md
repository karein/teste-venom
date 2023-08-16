Funções simples para teste do Venom-bot.

## Versões utilizadas

- ^5.0.7
- ^5.0.11

## Rodar o projeto - comandos

1. npm install
2. node index.js

## instalar versão específica a lib

- npm i venom-bot@\<version\>

### "Gambiarras" para cada versão

Alterações que funcionaram para mim (em relação ao erro `Error no open browser....`) usando whatsapp pessoal no <u>**linux**</u> e <u>**window**</u>.

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

### 5.0.7 & 5.0.11

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
