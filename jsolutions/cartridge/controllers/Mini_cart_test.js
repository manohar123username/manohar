/**
* Description of the Controller and the logic it provides
*
* @module  controllers/Mini_cart_test
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

var ISML = require('dw/template/ISML');
var guard = require('~/cartridge/scripts/guard');;
/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
function start(){
     ISML.renderTemplate('test.isml');
 }

/* Exports of the controller */
///**
// * @see {@link module:controllers/Mini_cart_test~myFunction} */
exports.Start = guard.ensure(['get'],start);

