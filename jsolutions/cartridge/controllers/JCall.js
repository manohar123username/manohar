/**
* A Caching controller.
*
* @module controllers/JCall    
*/
var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');


function start() {
	var myParam = request.httpParameterMap.param;		
	if (myParam.stringValue != null)
		{
                   ISML.renderTemplate(
                         'call/jnotEmpty.isml', {paramOnPdict:myParam}  
                        );
                
		}
	else{
                        ISML.renderTemplate(
                         'call/jempty.isml', {paramOnPdict:'param not found'}  
                        );
	};
}
exports.Start = guard.ensure(['get'], start);