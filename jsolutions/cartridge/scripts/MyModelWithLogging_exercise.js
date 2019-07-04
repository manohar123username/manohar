'use strict';
/**
 * @module util/MyModel
 */
  var CustomObjectMgr = require('dw/object/CustomObjectMgr');
  /***********************************************
   * require the Logger from dw.system package
  ************************************************/
  

  exports.createMyObject = function createMyObject( newsletterForm) 
{
    /***********************************************
   * use getLogger function from Logger class to 
   * to create a variable named "logger" to
   *write to log files with prefix "NewsLogs" and logging category "newsletter"
   
   ************************************************/        
     	var logger = 
		
		
		logger.debug( "Input params firstName: {0} lastName: {1} email: {2}", 
		newsletterForm.fname.value, newsletterForm.lname.value, newsletterForm.email.value);
		
		/**************************
        *		write any another personalized debug message below
		
		*****************************/

		
	try
	{
	             
	           var co = CustomObjectMgr.createCustomObject("NewsletterSubscription",newsletterForm.email.value);
			    co.custom.firstName=newsletterForm.fname.value;
			    co.custom.lastName=newsletterForm.lname.value;
	         return co;
	}
	catch (e)
	{
		logger.error("A newsletter subscription for this email address already exists: {0}", e.causeMessage );
		return null;
	}
         
};

