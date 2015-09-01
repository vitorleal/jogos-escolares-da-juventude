# Jogos Escolares da Juventude

![Jogos Escolares da Juventude](http://i.imgur.com/PFhF0Bp.gif)

Jogo de perguntas e repostas para os Jogos Escolares da Juventude.


## Desenvolvido em ES2015

O jogo foi desenvolvido em [ES2015](https://babeljs.io/docs/learn-es2015/) e compilado com [Babel](https://babeljs.io/) e [Browserify](http://browserify.org/).


## Electron

O jogo é compilado para rodar como um aplicativo nativo Mac e Windows usando o [Electron](http://electron.atom.io/).


### Build

Para gerar os aplicativos nativos basta rodas os comandos:

```
$ npm run build-win
```
para gerar o aplicativo Windows


```
$ npm run build-mac
```
para gerar o aplicativo Mac


O comando **build-{plataforma}** executa o comando **compile** que utiliza o Babel e o Browserify para transformar o aplicativo de ES2015 para ES5 e executar no navegador.

```
$ npm run compile
```
o comando compile é um alias para o comando:

```
$ browserify assets/js/*.es6.js -t babelify --outfile assets/js/bundle.js
```


## Autor

| [![twitter/vitorleal](http://gravatar.com/avatar/e133221d7fbc0dee159dca127d2f6f00?s=80)](http://twitter.com/vitorleal "Follow @vitorleal on Twitter") |
|---|
| [Vitor Leal](http://vitorleal.com) |
