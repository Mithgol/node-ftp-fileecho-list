var fs = require('fs');
var async = require('async');

module.exports = {
   async: function(listFilenames, callback){
      var accum = {};
      async.eachSeries(
         listFilenames,
         function listProcessor(listFilename, listProcessed){
            fs.readFile(
               listFilename,
               {
                  encoding: 'utf8'
               },
               function fileWasRead(err, listFile){
                  if( err ) return listProcessed(err);
                  var listLines = listFile.split(
                     /\r|\n/
                  ).map(function(line){
                     return line.replace(/\s/g, ' ').trim();
                  }).filter(function(line){
                     if( line.length < 1 ) return false;
                     if( line.indexOf('#') === 0 ) return false;
                     return true;
                  });
                  if( listLines.length < 2 ){
                     // either empty or contains only the FTP server's address
                     return listProcessed();
                  }

                  var addressFTP = listLines.shift();
                  if(!( addressFTP.endsWith('/') )) addressFTP += '/';

                  listLines.forEach(function(line){
                     if( line.indexOf(' ') < 0 ){
                        // single line item: echotag only
                        var lcLine = line.toLowerCase();
                        if( typeof accum[lcLine] !== 'undefined' ) return;
                        accum[lcLine] = addressFTP + line + '/';
                     } else {
                        // two line items: echotag and folder
                        var matches = /^(\S+)\s+(\S+)$/.exec(line);
                        if( matches === null ){
                           return listProcessed({
                              error: 'Unknown line format',
                              line: line
                           });
                        }
                        var echotag = matches[1].toLowerCase();
                        if( typeof accum[echotag] !== 'undefined' ) return;
                        accum[echotag] = addressFTP + matches[2] + '/';
                     }
                  });
                  return listProcessed();
               }
            );
         },
         function listProcessingFinished(err){
            if( err ) return callback(err);
            callback(null, accum);
         }
      );
   },
   sync: function(listFilenames){
      var accum = {};
      listFilenames.forEach(function listProcessorSync(listFilename){
         var listFile = fs.readFileSync(listFilename, { encoding: 'utf8' });
         var listLines = listFile.split( /\r|\n/ ).map(function(line){
            return line.replace(/\s/g, ' ').trim();
         }).filter(function(line){
            if( line.length < 1 ) return false;
            if( line.indexOf('#') === 0 ) return false;
            return true;
         });

         if( listLines.length < 2 ) return;
         // file is either empty or contains only the FTP server's address

         var addressFTP = listLines.shift();
         if(!( addressFTP.endsWith('/') )) addressFTP += '/';

         listLines.forEach(function(line){
            if( line.indexOf(' ') < 0 ){
               // single line item: echotag only
               var lcLine = line.toLowerCase();
               if( typeof accum[lcLine] !== 'undefined' ) return;
               accum[lcLine] = addressFTP + line + '/';
            } else {
               // two line items: echotag and folder
               var matches = /^(\S+)\s+(\S+)$/.exec(line);
               if( matches === null ) throw new Error({
                  error: 'Unknown line format',
                  line: line
               });

               var echotag = matches[1].toLowerCase();
               if( typeof accum[echotag] !== 'undefined' ) return;
               accum[echotag] = addressFTP + matches[2] + '/';
            }
         });
      }); // listFilenames.forEach
      return accum;
   }
};