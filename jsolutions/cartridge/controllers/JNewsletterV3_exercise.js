'use strict';
/** @module controllers/JNewsletterV2 */
var ISML = require('dw/template/ISML');
var Custombject=require('dw/object/CustomObject');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var newsletterForm = session.forms.newsletter;

/* use require to use Transaction from dw.system package */
var Transaction = require('dw/system/Transaction');

function start()
{
	newsletterForm.clearFormElement();
	ISML.renderTemplate('newsletter/newslettersignup', {
		ContinueURL : dw.web.URLUtils.https('JNewsletterV3-HandleForm'),
		CurrentForms :session.forms
	});
}
function handleForm() {
	var TriggeredAction = request.triggeredFormAction;
	
	if ( (TriggeredAction != null)	&& (TriggeredAction.formId == 'subscribe') )
	{
	
		Transaction.begin();
		try{
			//var myModel = require('~/cartridge/scripts/MyModel');/* use require to use MyModel from script folder */
			//var co=myModel.createMyObject(newsletterForm);
			var CustomObjectMgr=require('dw/object/CustomObjectMgr');	
			var co=CustomObjectMgr.createCustomObject("NewsletterSubscription",newsletterForm.email.value);
			newsletterForm.copyTo(co);
			Transaction.commit();
			ISML.renderTemplate('newsletter/newslettersuccessV2', {
				CurrentForms : session.forms,
				Subscription : co
			});
			return ;
		}
		catch (e){
			
			
			newsletterForm.email.invalidateFormElement();
			Transaction.rollback();
			ISML.renderTemplate('newsletter/newslettersignup', {
				ContinueURL : dw.web.URLUtils.https('JNewsletterV3-HandleForm'),
				CurrentForms :session.forms
			});
			return;
		} //try catch ends
	}
	else{
		
		ISML.renderTemplate('newsletter/newslettersignup', {
			ContinueURL : dw.web.URLUtils.https('JNewsletterV3-HandleForm'),
			CurrentForms :session.forms
		});
		return;
	}
}
exports.Start = guard.ensure(['get'],start);
exports.HandleForm=guard.ensure([],handleForm);