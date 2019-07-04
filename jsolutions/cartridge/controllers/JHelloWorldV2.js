/**
* A hello world controller.  This file is in cartridge/controllers folder
*
* @module controllers/JHelloWoldV2          
*/

var guard = require('storefront_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');

function start() {

	var myParameterMap = request.httpParameterMap;
	var myParameter=myParameterMap.param;
	    ISML.renderTemplate(
	                          'helloworld.isml', {myParameteronISML:myParameter}
	                         );
	  

};
exports.Start = guard.ensure(['get'], start);