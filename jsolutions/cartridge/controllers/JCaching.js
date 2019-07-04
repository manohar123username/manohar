/**
* A Caching controller.
*
* @module controllers/JCaching         
*/
	var ISML = require('dw/template/ISML');
	var guard = require('storefront_controllers/cartridge/scripts/guard');

function start(){

	        ISML.renderTemplate('cachedpage', {
	          });
        
}      
exports.Start = guard.ensure(['get'], start);
