'use strict';

/** @module controllers/JShowProduct */

var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var ProductMgr=require('dw/catalog/ProductMgr');

function start() {
    var parameterMap = request.httpParameterMap;
    var parameterId =parameterMap.pid.stringValue 
    var product = ProductMgr.getProduct(parameterId);
    if (product==null) {
        	 ISML.renderTemplate(
                     'productnotfound.isml', {message:'product with id '+parameterId+' not found'}  
                    );	
        } 
        else{
        	 ISML.renderTemplate(
                     'productfound.isml', {myProduct:product}  
                    );	
        	
        }
}
exports.Start = guard.ensure(['get'], start);

