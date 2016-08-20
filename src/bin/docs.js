#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');

const litdoc = require('litdoc');

const commands = require('../commands');

const block = (str) => '> ' + str.split('\n').join('\n> ');

// Takes all the cmd.docs and puts them into a big md file.
const generateCliMarkdown = () => {
  return _.map(commands, (command, name) => {
    return `\
## ${name}

${block(command.help)}

**Usage:** \`${command.usage || command.example}\`

${command.docs}
`.trim();
  }).join('\n\n\n');
};

// Writes out a big markdown file for the cli.
const writeCliDocs = ({ markdownPath } = {}) => {
  const docs = generateCliMarkdown();

  fs.writeFileSync(markdownPath, `\
# Zapier CLI Reference

These are the generated docs for all Zapier platform CLI commands.

You can install the CLI with \`npm\`.

${'```'}bash
$ npm install -g @zapier/zapier-platform-cli
${'```'}

# Commands

${docs}
`);
};


writeCliDocs({
  markdownPath: './docs/cli.md'
});

litdoc({
  title: 'Zapier Platform CLI Documentation',
  markdownPath: path.join(__dirname, '../../README.md'),
  outputPath: path.join(__dirname, '../../docs/index.html')
});

// TODO: toc(../../docs/README.md) to ../../README.md

litdoc({
  title: 'Zapier Platform CLI Reference',
  markdownPath: path.join(__dirname, '../../docs/cli.md'),
  outputPath: path.join(__dirname, '../../docs/cli.html')
});
