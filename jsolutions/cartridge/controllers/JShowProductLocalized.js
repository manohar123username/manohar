'use strict';

/** @module controllers/JShowProductLocalized */

var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var ProductFinder=require('~/cartridge/scripts/ProductFinder');

function start() {
    var parameterMap = request.httpParameterMap;
    var parameterId =parameterMap.pid.stringValue 
    //var product = ProductMgr.getProduct(parameterId);
    
    var product=ProductFinder.giveMeProduct(parameterId);
    if (product==null) {
    	var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null, parameterId);
        	 ISML.renderTemplate(
                     'productnotfound.isml', {message:errorMsg}  
                    );	
        } 
        else{
        	 ISML.renderTemplate(
                     'productfound.isml', {myProduct:product}  
                    );	
        	
        }
}  	
exports.Start = guard.ensure(['get'], start);

