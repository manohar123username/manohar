/**
* Description of the Controller and the logic it provides
*
* @module  controllers/JMap
*/

'use strict';

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions
var ISML = require('dw/template/ISML');
var guard = require('double2_controllers/cartridge/scripts/guard');
var hashmap=require('dw/util/HashMap');


function start()
{
var hmap=new hashmap();
hmap.put('1','a');
hmap.put('2','b');
hmap.put('3','c');
var value=hmap.values();
var iterator=value.iterator();


var length=hmap.getLength();
ISML.renderTemplate('map.isml', 
		{Length:length,Iterator:iterator});
}
exports.Start=guard.ensure(['get'],start);

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
// var myFunction = function(){
//     return 'myFunction';
// }



/* Exports of the controller */
///**
// * @see {@link module:controllers/JMap~myFunction} */
//exports.MyFunction = myFunction;

