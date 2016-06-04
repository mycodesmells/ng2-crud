# Starting Angular 2 Project with Yeoman

It's time we come back to Typescript, and take a look on The Framework that may make it more popular than it has been ever before - Angular 2. Unfortunately, working with a new framework and a new language at the same time can be quite challenging for web developers accustomed with pure Java Script, so you probably need all the help you can get. This is where Yeoman can step in. This blog post introduces the idea of starting an Angular 2 Typescript project with Webpack, using Yeoman generator.

### Getting started wih Angular 2

Very often when you want to get started with some framework, programming language of a tool, you need to search for a blog post containing some example, or Stack Overflow thread. Great news is that this is not the case with Angular 2, as its docs are one of the best you can get. It took their team a long time to create and polish the framework, but apparently they spent some time preparing good manual as well. You might want to check out their [Quickstart](https://angular.io/docs/ts/latest/quickstart.html) to see how easy it is to get started. Or is it? Before you can create your first component you need to make a few steps:

 - create `package.json` with multiple important dependencies,
 - create `tsconfig.json` for an appropriate Typescript compilator configuration,
 - create `systemjs.config.js` file for an appropriate SystemJS configuration,
 - create `typings.json` with information about Typescript definitions for dependencies

### SystemJS vs Webpack

This is rather a question of personal preference, but I think Webpack is more user-friendly (mainly because I haven't had much experience with SystemJS). This is why I was wondering how can I use Angular 2 with it.

All that above means, that every time you want to get started with Angular, you have many things to do. And chances are, that you don't want to waste your precious time, do you?

### Yeoman and its generators

If you have some experience with web development, you might have heard about Yeoman already. This is a pretty popular tool that allows you to generate seed projects using some particular technology (language, framework, database etc) with a few, simple steps. The whole process is semi-automated, as it just requires you to answer some questions about your project configuration.

In order to get started with Yeoman, you need to install it first via npm:

    npm install -g yo

As you can see, we install it as a global dependency, because you will need to call it directly from command line. To verify installation, you can type:

    $ yo --version
    1.8.4

Generating projects with Yeoman requires you to have a proper _generator_ installed. In our case, we need generator-angular-2-webpack (available [on Github](https://github.com/bravealdus/generator-angular-2-webpack)) which fits our needs perfectly! As with Yeoman itself, we install it via npm:

    npm install -g generator-angular-2-webpack

Then, you can run this generator and find out, that you just need to set your project name:

    $ yo angular-2-webpack
    ? Your project name ng2-crud
       create ng2-crud/config/helpers.js
       create ng2-crud/config/webpack.common.js
       create ng2-crud/config/webpack.dev.js
       create ng2-crud/config/webpack.prod.js
       create ng2-crud/images/angular-128.png
       create ng2-crud/package.json
       create ng2-crud/README.md
       create ng2-crud/src/app/app.component.css
       create ng2-crud/src/app/app.component.html
       create ng2-crud/src/app/app.component.ts
       create ng2-crud/src/app/components/example-base-component/button-timer.component.css
       create ng2-crud/src/app/components/example-base-component/button-timer.component.html
       create ng2-crud/src/app/components/example-base-component/button-timer.component.ts
       create ng2-crud/src/app/services/example-timer.service.ts
       create ng2-crud/src/index.html
       create ng2-crud/src/main.ts
       create ng2-crud/src/polyfills.ts
       create ng2-crud/src/styles/global.css
       create ng2-crud/src/vendor.ts
       create ng2-crud/tsconfig.json
       create ng2-crud/typings.json
       create ng2-crud/webpack.config.js

### Generator output

The output you get is a directory called `ng2-crud` (the name you selected) containing some some important files and directories:

    config
    images
    package.json
    README.md
    src
    tsconfig.json
    typings.json
    webpack.config.js

Some of the items (`images`, `package.json`, `README.md`, `tsconfig.json`, `typings.json` and `webpack.config.js`) are obvious. To complete the list you have `config` file containing a couple of base Webpack configurations (common properties, development config and production config) and `src` containing example source files.

To have some results working quickly, just install dependencies and start the server:

    $ npm install
    ...
    $ npm start

    > ng2-crud@0.0.1 start /tmp/ym/ng2-crud
    > webpack-dev-server --inline --progress --port 8080

     70% 3/3 build moduleshttp://localhost:8080/
    webpack result is served from http://localhost:8080/
    content is served from /tmp/ym/ng2-crud
    404s will fallback to /index.html
     36% 4/9 build modulests-loader: Using typescript@1.8.10 and /tmp/ym/ng2-crud/tsconfig.json
    chunk    {0} app.js, app.css (app) 6.08 kB {2} [rendered]
    chunk    {1} polyfills.js (polyfills) 586 kB [rendered]
    chunk    {2} vendor.js (vendor) 2.22 MB {1} [rendered]
    Child html-webpack-plugin for "index.html":
        chunk    {0} index.html 303 bytes [rendered]
    Child extract-text-webpack-plugin:
        chunk    {0} extract-text-webpack-plugin-output-filename 222 kB [rendered]
    Child extract-text-webpack-plugin:
        chunk    {0} extract-text-webpack-plugin-output-filename 1.95 kB [rendered]
    webpack: bundle is now VALID.

Now you can open your favourite browser (http://localhost:8080/) and see:

<img src="https://raw.githubusercontent.com/mycodesmells/ng2-crud/master/posts/images/ng2-generator-working.png"/>

It didn't take long, did it?
