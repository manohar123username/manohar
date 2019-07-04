/**
*
* @module controllers/JTesting  
*/

	var ISML = require('dw/template/ISML');
	var guard = require('double2_controllers/cartridge/scripts/guard');
	var BasketMgr = require('dw/order/BasketMgr');
	
	function start() {
		   
		 /*  
		  * var basketResult = new dw.system.Pipelet('GetBasket').execute({}); 
		  * var basket=basketResult.Basket; 
		 */
    
		var basket = BasketMgr.getCurrentBasket();
	    ISML.renderTemplate(
	            'sessionBasket.isml', {Basket:basket
	           	  				
	            					}
	           );
     }
	exports.Start = guard.ensure(['get'], start);
