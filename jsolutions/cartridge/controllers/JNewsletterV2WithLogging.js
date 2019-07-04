'use strict';

/** @module controllers/JNewsletterV2 */

var ISML = require('dw/template/ISML');
var Custombject=require('dw/object/CustomObject');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var newsletterForm = session.forms.newsletter;
var Transaction = require('dw/system/Transaction');

function start() 
{   
     		   newsletterForm.clearFormElement();
               ISML.renderTemplate('newsletter/newslettersignup', {
                        ContinueURL : dw.web.URLUtils.https('JNewsletterV2WithLogging-HandleForm'),
                        CurrentForms :session.forms
                });
}

function handleForm() {

    var TriggeredAction = request.triggeredFormAction;
   
      if ( (TriggeredAction != null) 
          && (TriggeredAction.formId == 'subscribe')   ) 
     { 
    	  	  
    	 Transaction.begin();
		try{ 
			
			 var myModel = require('~/cartridge/scripts/MyModelWithLogging');  
             var co=myModel.createMyObject(newsletterForm);
             if(co==null){
            	 response.getWriter.print("The object produced is null");
            	 return;
             }
           
             Transaction.commit();
		           ISML.renderTemplate('newsletter/newslettersuccessV2', {
                         CurrentForms    : session.forms,
                         Subscription    : co
                 });  

         return ;
		}	   		
		catch (e){
		   	 response.getWriter().println("In the exception block "+e);
		   	 newsletterForm.email.invalidateFormElement();
		    Transaction.rollback();  	
		   	    ISML.renderTemplate('newsletter/newslettersignup', {           	
                        ContinueURL : dw.web.URLUtils.https('JNewsletterV2WithLogging-HandleForm'),
                        CurrentForms :session.forms
                }); 
               return;
		}


	 }
	 else{ 
			//your email address is not even a valid email address go back and fill forms again
			//response.getWriter().println("session forms are here: "+session.forms);
	   	    ISML.renderTemplate('newsletter/newslettersignup', {           	
                ContinueURL : dw.web.URLUtils.https('JNewsletterV2WithLogging-HandleForm'),
                CurrentForms :session.forms
	   	    	}); 
	   	    return;  

	 } 

}

exports.Start = guard.ensure(['get'],start);
exports.HandleForm=guard.ensure([],handleForm);

