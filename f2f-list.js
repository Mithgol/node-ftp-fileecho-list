var fs = require('fs');
var async = require('async');

module.exports = function(listFilenames, callback){
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
               ).filter(function(line){
                  if( /^\s*$/.test(line) ) return false;
                  return true;
               }).map(function(line){
                  return line.trim();
               });
               if( listLines.length < 2 ){
                  // either empty or contains only the FTP server's address
                  return listProcessed();
               }
               var addressFTP = listLines.shift();
               listLines.forEach(function(line){
                  var lcLine = line.toLowerCase();
                  if( typeof accum[lcLine] !== 'undefined' ) return;
                  accum[lcLine] = addressFTP + line + '/';
               });
               listProcessed();
            }
         );
      },
      function listProcessingFinished(err){
         if( err ) return callback(err);
         callback(null, accum);
      }
   );
};