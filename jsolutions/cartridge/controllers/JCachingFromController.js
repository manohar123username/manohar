/**
* A Caching controller.
*
* @module controllers/JCachingFromController         
*/

	var ISML = require('dw/template/ISML');
	var guard = require('storefront_controllers/cartridge/scripts/guard');
	var Calendar = require('dw/util/Calendar');
	
function start(){

	        var cal = new Calendar();
	        cal.add(Calendar.MINUTE, 30);
	        response.setExpires(cal.getTime());
	                ISML.renderTemplate('cachedpage2', {
	                   Message: 'Hello World!',
	                   myTime:cal.getTime()
	                  });

}      
exports.Start = guard.ensure(['get'], start);
