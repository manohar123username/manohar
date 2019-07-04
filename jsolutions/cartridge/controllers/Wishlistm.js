'use strict';

/** @module controllers/JShowProduct */

var ISML = require('dw/template/ISML');
var guard = require('double2_controllers/cartridge/scripts/guard');
var ProductMgr=require('dw/catalog/ProductMgr');
var ProductListMgr=require('dw/customer/ProductListMgr');

function start() {
	//ProductList=ProductListMgr.createProductList(customer,10);
	//ProductList2=ProductListMgr.createProductList(customer,10);
	var parameterMap = request.httpParameterMap;
    var parameterId =parameterMap.pid.stringValue;
    var product = ProductMgr.getProduct(parameterId);

    


	var customer=AuthenticationStatus.getCustomer();
   var productList=ProductListMgr.createProductList(customer,10);	
   var productListItem=productList.createProductItem(product);
   
	
   // var parameterMap = request.httpParameterMap;
    // var parameterId =parameterMap.pid.stringValue;
   // var product = ProductMgr.getProduct(parameterId);
    if (productListItem==null) {
        	 ISML.renderTemplate(
                     'productList.isml', {message:'productList is not created'}  
                    );	
        } 
        else{
        	 ISML.renderTemplate(
                     'productListFound.isml', {myProduct:productList}  
                    );	
        	
        }
}
exports.Start = guard.ensure(['get'], start);

