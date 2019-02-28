'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the superb ${chalk.red('generator-node-component')} generator!`)
    );

    const prompts = [
      {
        name: 'hyphenName',
        message: `Component ${chalk.bold.yellow('hyphen')} name`,
        default: process
          .cwd()
          .split(path.sep)
          .pop()
      },
      {
        name: 'description',
        message: 'Description: '
      },
      {
        name: 'author',
        message: 'Author: '
      },
      {
        type: 'confirm',
        name: 'asClass',
        message: 'Create component as class?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let capitalize = string => string.replace(/\b\w/g, l => l.toUpperCase());
    let firstLower = string => string.charAt(0).toLowerCase() + string.slice(1);
    let className = this.props.hyphenName
      .split(/[ -_]/g)
      .map(seg => capitalize(seg))
      .join('');
    className = this.props.asClass ? className : firstLower(className);

    let vars = {
      hyphenName: this.props.hyphenName,
      className: className,
      objectName: firstLower(className),
      description: this.props.description,
      author: this.props.author
    };

    let classFile = {
      f: [this.props.asClass ? 'indexClass' : 'index'],
      origin: 'src/{file}.ejs',
      dest: `src/${className}.js`
    };
    let mainFiles = {
      f: [this.props.asClass ? 'mainClass' : 'main'],
      origin: '{file}.ejs',
      dest: 'main.js'
    };
    let dontModifyFiles = {
      f: ['bin'],
      origin: '{file}.ejs',
      dest: '{file}.js'
    };
    let slashFiles = {
      f: ['package.json'],
      origin: '_{file}',
      dest: '{file}'
    };
    let dotFiles = {
      f: ['babelrc', 'gitignore', 'jsdoc', 'npmignore'],
      origin: '{file}',
      dest: '.{file}'
    };

    let files = [classFile, mainFiles, dontModifyFiles, slashFiles, dotFiles];

    files.forEach(element => {
      element.f.forEach(file => {
        let origin = element.origin.replace('{file}', file);
        let dest = element.dest.replace('{file}', file);
        this.fs.copyTpl(this.templatePath(origin), this.destinationPath(dest), vars);
      });
    });
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
