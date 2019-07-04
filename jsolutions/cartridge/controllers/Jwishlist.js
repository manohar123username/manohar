'use strict';

/** @module controllers/JShowProduct */


var ISML = require('dw/template/ISML');
var guard = require('double2_controllers/cartridge/scripts/guard');
var ProductMgr=require('dw/catalog/ProductMgr');
var productlistmgr=require('dw/customer/ProductListMgr');
var authenticationstatus=require('dw/customer/AuthenticationStatus');



function start() {
	var Customer=authenticationstatus.getCustomer();
	ISML.renderTemplate(
            'customer.isml', {customer:Customer}  

	)
}
	
/**	var productlist=productlistmgr.createProductList(customer,10);
	 
    var myParameterMap = request.httpParameterMap;
    var productResult = null;
    if (myParameterMap.pid.stringValue) {
        productResult = getProduct(myParameterMap.pid.stringValue);    
    }
  
    ISML.renderTemplate(
                         'productfound.isml', {myProduct:productResult.returnedProduct}  
                      );
}


function getProduct(pidString) {
	var product = ProductMgr.getProduct(pidString);
	  
    if (product==null) {
        return {
            error : true
        };
    }
  
    return {
        returnedProduct  :product    
    };
} */
      	
exports.Start = guard.ensure(['get'], start); 

