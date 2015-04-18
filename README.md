[![(a histogram of downloads)](https://nodei.co/npm-dl/ftp-fileecho-list.png?height=3)](https://npmjs.org/package/ftp-fileecho-list)

This module (`ftp-fileecho-list`) is a reader of lists of FTP-mirrored fileechoes.

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. (Node.js version 0.10.x or 0.12.x is recommended. The latest stable [io.js](https://iojs.org/) is fine too.)

## Lists of FTP-mirrored fileechoes

A **fileecho** is a **file echomail area** in Fidonet or in some other FTN (Fidonet-type network). A fileecho is a medium that distributes files to its subscribers.

**FTP mirrors** of some fileechoes exist. They are (usually) FTP-accessible directories where each subdirectory corresponds to a fileecho of the same (or similar) name and contain a number of files recently distibuted to the subscribers of that fileecho.

This JavaScript module (the reader) parses lists of FTP-mirrored fileechoes. Each list is treated as a text file and parsed in the following order:

* Both CR (`'\r'`) and LF (`'\n'`) characters are treated as line separators.

* Empty lines are ignored. Lines that contain only whitespace (i.e. character class `\s` in regular expressions) are also ignored.

* Lines that start with the `'#'` character are treated as comment lines and thus ignored. That character may be preceded by a whitespace (i.e. character class `\s` in regular expressions) or several whitespaces and such lines are ignored nevertheless.

* Whitespace characters are removed from the beginning and from the ending of the remaining lines of the text.

* The first of the remaining lines is treated as an URL of a directory on an FTP server. (It is implied that such directory contains subdirectories for mirrored fileechoes.) If such URL does not end with the slash (the `'/'` character), it is added by the reader.

* The rest of the remaining lines are treated as describing individual file echomail areas:
   * If a line contains only one “word” (no spaces), that word is understood as an echotag (a name of a filecho) and also as a name of an FTP subdirectory containing files from that fileecho.
   * If a line contains two “words” (separated by one or more whitespace characters), the first word is understood as an echotag (a name of a filecho) and the second word is understood as a name of an FTP subdirectory containing files from that fileecho.
   * If a line contains three (or more) such “words”, an error is thrown.

Here's an example of such a list of FTP-mirrored fileechoes:

```
# This server's address is fictional.
ftp://filemirror.example.org
aftnbinkd
aftnged
nodelisa
nodelisz
xofcelist
```

## Installing the reader

[![(npm package version)](https://nodei.co/npm/ftp-fileecho-list.png?downloads=true&downloadRank=true)](https://npmjs.org/package/ftp-fileecho-list)

* Latest packaged version: `npm install ftp-fileecho-list`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-ftp-fileecho-list/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/node-ftp-fileecho-list#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing the reader

[![(build testing status)](https://img.shields.io/travis/Mithgol/node-ftp-fileecho-list/master.svg?style=plastic)](https://travis-ci.org/Mithgol/node-ftp-fileecho-list)

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of the reader).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the reader).

After that you may run `npm test` (in the directory of the reader).

## License

MIT license (see the `LICENSE` file).
