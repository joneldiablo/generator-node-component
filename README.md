# generator-node-component

Install yeoman and generator globally:

```cli
  npm i -g yo https://github.com/joneldiablo/generator-node-component.git
```

Alternative, install yeoman globally, clone the generator project and link them:

```cli
  npm i -g yo
  git clone https://github.com/joneldiablo/generator-node-component.git
  cd ./generator-node-component
  npm link
```

===

Create folder and use the generator:

```cli
  mkdir {{new-component}}
  cd {{new-component}}
  yo node-component
```

Replace **{{new-component}}** with the name for your component hyphens format

===

Done

- Babel and build lib
- jsDoc documentation

TODO:

- readme file !!!!
- comments
- npm integration o.O
- add testing
- add option command line.
- add option microservice.
- add option integration (like travis, build automagically, etc).
- add git init and repo
- add typescript option
- front option (react, angular, pug, etc)
- back option (express, fatify, etc)