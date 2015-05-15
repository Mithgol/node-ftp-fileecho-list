/* global describe, it */
var assert = require('assert');
var path = require('path');
var listReader = require('../');

describe('Asynchronous reader of lists of FTP-mirrored fechomail', function(){
   it('can read two such lists correctly', function(done){
      listReader.async(
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
   it('can also read an arealist of a WebBBS', function(done){
      listReader.async(
         [
            path.join(__dirname, 'fido.g0x.ru.httparea')
         ],
         function(err, arealist){
            if( err ) throw err;
            assert.strictEqual(
               arealist['enet.sysop'],
               'http://fido.g0x.ru/?area://ENET.SYSOP/'
            );
            assert.strictEqual(
               arealist['ru.blog.mithgol'],
               'http://fido.g0x.ru/?area://RU.BLOG.MITHGOL/'
            );
            assert.strictEqual(
               arealist['xsu.useless.faq'],
               'http://fido.g0x.ru/?area://XSU.USELESS.FAQ/'
            );
            done();
         }
      );
   });
});

describe('Synchronous reader of lists of FTP-mirrored fechomail', function(){
   it('can read two such lists correctly', function(){
      var fecholist = listReader.sync([
         path.join(__dirname, 'fido.hubahuba.su.ftpfecho'),
         path.join(__dirname, 'fido.liona.ru.ftpfecho')
      ]);
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
         fecholist.xofchubslst, 'ftp://fido.hubahuba.su/XOFCHUBS.LST/'
      );
      assert.strictEqual(
         fecholist.tvannounce, 'ftp://fido:fido@fido.liona.ru/tvannounce/'
      );
   });
   it('can also read an arealist of a WebBBS', function(){
      var arealist = listReader.sync([
         path.join(__dirname, 'fido.g0x.ru.httparea')
      ]);
      assert.strictEqual(
         arealist['enet.sysop'],
         'http://fido.g0x.ru/?area://ENET.SYSOP/'
      );
      assert.strictEqual(
         arealist['ru.blog.mithgol'],
         'http://fido.g0x.ru/?area://RU.BLOG.MITHGOL/'
      );
      assert.strictEqual(
         arealist['xsu.useless.faq'],
         'http://fido.g0x.ru/?area://XSU.USELESS.FAQ/'
      );
   });
});
