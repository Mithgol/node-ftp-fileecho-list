/* global describe, it */
var assert = require('assert');
var path = require('path');
var readerFTPFEcho = require('../');

describe('Reader of lists of FTP-hosted Fidonet fechomail areas', function(){
   it('can read two such lists correctly', function(done){
      readerFTPFEcho(
         [
            path.join(__dirname, 'fido.hubahuba.su.ftpfecho'),
            path.join(__dirname, 'fido.liona.ru.ftpfecho')
         ],
         function(err, fecholist){
            if( err ) throw err;
            assert.strictEqual(
               fecholist.aftnged, 'ftp://fido.hubahuba.su/AFTNGED/'
            );
            assert.strictEqual(
               fecholist.aftnbinkd, 'ftp://fido:fido@fido.liona.ru/aftnbinkd/'
            );
            assert.strictEqual(
               fecholist.z2pnt, 'ftp://fido.hubahuba.su/Z2PNT/'
            );
            assert.strictEqual(
               fecholist.xofchubslst,
               'ftp://fido.hubahuba.su/XOFCHUBS.LST/'
            );
            assert.strictEqual(
               fecholist.tvannounce,
               'ftp://fido:fido@fido.liona.ru/tvannounce/'
            );
            done();
         }
      );
   });
});
