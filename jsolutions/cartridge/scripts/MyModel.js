'use strict';
/**
 * @module util/MyModel
 */
  var CustomObjectMgr = require('dw/object/CustomObjectMgr');
  exports.createMyObject = function createMyObject( newsletterForm) 
{
          // response.getWriter().println('in the model going to do magic');
           var co = CustomObjectMgr.createCustomObject("NewsletterSubscription",newsletterForm.email.value);
		    co.custom.firstName=newsletterForm.fname.value;
		    co.custom.lastName=newsletterForm.lname.value;
		   

         return co;
};


