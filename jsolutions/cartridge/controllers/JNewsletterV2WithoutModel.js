'use strict';

/** @module controllers/JNewsletterV2WithoutModel */

var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var CustomObjectMgr=require('dw/object/CustomObjectMgr')
var newsletterForm = session.forms.newsletter;

function start() 
{ 
     session.forms.newsletter.clearFormElement();
               ISML.renderTemplate('newsletter/newslettersignup', {
                        ContinueURL : dw.web.URLUtils.https('JNewsletterV2WithoutModel-HandleForm'),
                        CurrentForms :session.forms
                });
}

function HandleForm() {

    var TriggeredAction = request.triggeredFormAction;
     response.getWriter().println('Triggered Action is : '+TriggeredAction);
    
     
      if ( (TriggeredAction != null)  && (TriggeredAction.formId == 'subscribe')) 
     { //did you press subscribe button ?
    	response.getWriter().println('Triggered action is not null');
      	response.getWriter().println('Triggered Action is: '+TriggeredAction.formId);
    	
  
    	
		var Transaction = require('dw/system/Transaction');
		Transaction.begin();
		try{ 
		   	var co = CustomObjectMgr.createCustomObject("NewsletterSubscription",newsletterForm.email.value);
           
		    //response.getWriter().println('fname inthe form is: '+newsletterForm.fname.value);
		    co.custom.firstName=newsletterForm.fname.value;
		    co.custom.lastName=newsletterForm.lname.value;
		    Transaction.commit();
		         ISML.renderTemplate('newsletter/newslettersuccess', {
                         CurrentForms    : session.forms
                 }); 

         return ;
        }
		   		

		   catch (e){
		   	 //response.getWriter().println("In th exception block "+e);
		   	 newsletterForm.email.invalidateFormElement();
		    Transaction.rollback();  	
		   	   ISML.renderTemplate('newsletter/newslettersignup', {           	
                        ContinueURL : dw.web.URLUtils.https('JNewsletterV2WithoutModel-HandleForm'),
                        CurrentForms :session.forms
                });
               return;
		   }


		}
		else{ 
			
			//your email address is not even a valid email address go back and fill forms again		
			//response.getWriter().println("session forms are here: "+session.forms);
			
			  ISML.renderTemplate('newsletter/newslettererrorV2', {
                CurrentForms    : session.forms
            });  

		} 

}

exports.Start = guard.ensure(['get'],start);
exports.HandleForm = guard.ensure(['post'], HandleForm);

