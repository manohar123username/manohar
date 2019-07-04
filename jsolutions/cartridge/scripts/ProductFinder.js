'use strict';
/**
 * @module util/MyModel
 */
  var ProductMgr = require('dw/catalog/ProductMgr');
  exports.giveMeProduct = function giveMeProduct( pid) 
{  
		var product = ProductMgr.getProduct(pid);
         return product;
};

//var productPath = require('ProductFinder');
//var product = productPath.giveMeProduct("ahjd");