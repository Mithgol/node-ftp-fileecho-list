[![(a histogram of downloads)](https://nodei.co/npm-dl/ftp-fileecho-list.png?height=3)](https://npmjs.org/package/ftp-fileecho-list)

This module (`ftp-fileecho-list`) is a reader of lists of FTP-mirrored fileechoes.

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run.
* Starting from v3.0.0, this module requires Node.js version 4.0.0 or newer because the module is rewritten in ECMAScript 2015 (ES6). The module is tested against Node.js v4 and the latest stable Node.js version.
* You may run older versions of this module in Node.js version 0.10.x or 0.12.x. These older versions of this module, however, had to contain an additional dependency ([`underscore.string`](https://www.npmjs.com/package/underscore.string)) to work around a missing [ECMAScript 2015 (ES6) feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) which is now a part of Node.js. And those older versions of Node.js are themselves not maintained by their developers after 2016-12-31.

## Lists of FTP-mirrored fileechoes

A **fileecho** is a **file echomail area** in Fidonet or in some other FTN (Fidonet-type network). A fileecho is a medium that distributes files to its subscribers.

**FTP mirrors** of some fileechoes exist. They are (usually) FTP-accessible directories where each subdirectory corresponds to a fileecho of the same (or similar) name and contains a bunch of files recently distibuted to the subscribers of that fileecho.

This JavaScript module (the reader) parses lists of FTP-mirrored fileechoes. Each list is treated as a text file and parsed in the following order:

* Both CR (`'\r'`) and LF (`'\n'`) characters are treated as line separators.

* Empty lines are ignored.

* Lines that contain only a whitespace (i.e. character class `\s` in regular expressions) or several whitespaces are also ignored.

* Lines that start with the `'#'` character are treated as comment lines and thus ignored. That character may be preceded by a whitespace (i.e. character class `\s` in regular expressions) or several whitespaces and such lines are ignored nevertheless.

* Whitespace characters are removed from the beginning and from the ending of the remaining lines of the text.

* The first of the remaining lines is treated as an URL of a directory on an FTP server. (It is implied that such directory contains subdirectories for mirrored fileechoes.) If such URL does not end with the slash (the `'/'` character), it is added by the reader.

* The rest of the remaining lines are treated as describing individual file echomail areas:
   * If a line contains only one “word” (no spaces), that word is understood as an echotag (a name of a filecho) and also as a name of an FTP subdirectory containing files from that fileecho.
   * If a line contains two “words” (separated by one or more whitespace characters), the first word is understood as an echotag (a name of a filecho) and the second word is understood as a name of an FTP subdirectory containing files from that fileecho.
   * If a line contains three (or more) such “words”, an error is thrown.

Here's an example of such a list of FTP-mirrored fileechoes:

```
# This line is an example of a comment.
# The server's address (given below) is fictional.
ftp://filemirror.example.org
aftnbinkd
aftnged
nodelisa
nodelisz
xofcelist xofcel
```

## Installing the reader

[![(npm package version)](https://nodei.co/npm/ftp-fileecho-list.png?downloads=true&downloadRank=true)](https://npmjs.org/package/ftp-fileecho-list)

* Latest packaged version: `npm install ftp-fileecho-list`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-ftp-fileecho-list/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/node-ftp-fileecho-list#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using the reader

When you `require()` the installed module, you get an object with the following two methods:

### async(lists, callback)

This method has the following arguments:

* `lists` — an array of full paths to files containing lists. Paths must be given in the reverse order of their importance (i.e. given from the most important to the least important): if a particular fileecho is present in several lists, that fileecho's URL is based on the first (and not the last) of such lists.

* `callback` — a function that is asynchronously called when all the lists are read. The function has the following two arguments:
   * `error` — if not `null`, an error happened and thus the following argument (`URLs`) can be missing or invalid.
   * `URLs` — an object containing URLs (FTP addresses) of the folders that correspond to fileechoes and have been read from the given lists.

Each name of a property of that `URLs` object is a lowercase version of some fileecho's name (as returned by the [`String.prototype.toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method). That property's value contains the FTP address (URL) of the folder where the mirrored files of that fileecho reside. (The address ends with a `'/'` character.)

The following `URLs` object would be given to the callback for the list from the above example:

```js
{
   "aftnbinkd":  "ftp://filemirror.example.org/aftnbinkd/",
   "aftnged":    "ftp://filemirror.example.org/aftnged/",
   "nodelisa":   "ftp://filemirror.example.org/nodelisa/",
   "nodelisz":   "ftp://filemirror.example.org/nodelisz/",
   "xofcelist":  "ftp://filemirror.example.org/xofcel/"
}
```

### sync(lists)

Same as above, but with the following differences:

* The `URLs` object is constructed synchronously and then returned from the method (using `return`).

* Any encountered errors are thrown (using `throw`).

## Possible alternatives to the primary purpose

The reader does not require that the first meaningful line of the list starts with `ftp://`.

The reader can therefore be used in various applications (not necessarily FTP-related) to read similar lists where the first line contains a common beginning of some URLs and other lines of the same list contain different endings for those URLs.

For example, the reader can read an arealist (an echolist) that describes the URLs of echomail areas available on a particular WebBBS that adheres to the [FGHI URL](https://github.com/Mithgol/FGHI-URL) standard; such list might look like the following:

```
# The server's address (given below) is fictional.
http://bbs.example.org/?area://
FTSC_PUBLIC
RU.FTN.DEVELOP
SU.FIDOTECH
```

The reader is quite able to read that list and then use the given callback to return the following object:

```js
{
   "ftsc_public":     "http://bbs.example.org/?area://FTSC_PUBLIC/",
   "ru.ftn.develop":  "http://bbs.example.org/?area://RU.FTN.DEVELOP/",
   "su.fidotech":     "http://bbs.example.org/?area://SU.FIDOTECH/"
}
```

## Testing the reader

[![(build testing status)](https://img.shields.io/travis/Mithgol/node-ftp-fileecho-list/master.svg?style=plastic)](https://travis-ci.org/Mithgol/node-ftp-fileecho-list)

It is necessary to install [Mocha](https://mochajs.org/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of the reader).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the reader).

After that you may run `npm test` (in the directory of the reader).

## License

MIT license (see the `LICENSE` file).
