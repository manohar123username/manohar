/**
* A hello world controller.  This file  is in cartridge/controllers folder
*
* @module controllers/JBasketV2   this uses Model to invoke the basket
*/

var ISML = require('dw/template/ISML');
var guard = require('double2_controllers/cartridge/scripts/guard');

function start() {

          var BasketModel = require('~/cartridge/scripts/BasketModel');
          var basket = BasketModel.getMyBasket();
	      ISML.renderTemplate(
                         'showBasket.isml', {
                        	  				myBasket:basket
                         					}
                        );
}
exports.Start = guard.ensure(['get'], start);
