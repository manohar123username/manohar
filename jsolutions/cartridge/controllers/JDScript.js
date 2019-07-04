var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');
function start() {
	
	ISML.renderTemplate(
	           'vartest.isml', 
	           {
	            
	           }  
	           );	
	
}
exports.Start = guard.ensure([ 'get'], start);
