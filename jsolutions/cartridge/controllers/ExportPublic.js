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
                        ContinueURL : dw.web.URLUtils.https('ExportPublic-HandleForm'),
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
    		
		try{
		   	var co = CustomObjectMgr.createWrongCustomObject("NewsletterSubscription",newsletterForm.email.value);
           
		    //response.getWriter().println('fname inthe form is: '+newsletterForm.fname.value);
		    co.custom.firstName=newsletterForm.fname.value;
		    co.custom.lastName=newsletterForm.lname.value;
		}
		catch(e){
			response.getWriter().print(e.causeMessage);
			return;
		
		}
		         ISML.renderTemplate('newsletter/newslettersuccess', {
                         CurrentForms    : session.forms
                 }); 

 
}
}

exports.Start = guard.ensure(['get'],start);
exports.HandleForm = guard.ensure(['post'], HandleForm);

