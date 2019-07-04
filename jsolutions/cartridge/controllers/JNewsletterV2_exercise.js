'use strict';
/** @module controllers/JNewsletterV2 */
var ISML = require('dw/template/ISML');
var Custombject=require('dw/object/CustomObject');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var newsletterForm = session.forms.newsletter;

/******************************************** 
 * Use require to use Transaction from dw.system package 
 * 
 * */


function start()
{
	newsletterForm.clearFormElement();
	ISML.renderTemplate('newsletter/newslettersignup', {
		ContinueURL : dw.web.URLUtils.https('JNewsletterV2-HandleForm'),
		CurrentForms :session.forms
	});
}
function handleForm() {
	var TriggeredAction = request.triggeredFormAction;
	
	if ( (TriggeredAction != null)	&& (TriggeredAction.formId == 'subscribe') )
	{
		/******************************************** 
		 *	use quickcard section “Explicit Transactions” to seek 
		 * help and begin Transaction */
		
		try{
			var myModel = require('~/cartridge/scripts/MyModel');/* use require to use MyModel from script folder */
			var co=myModel.createMyObject(newsletterForm);
			
            /******************************************** 
			 * use quickcard section “Explicit Transactions” to seek 
			 * help and commit Transaction */
		
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
				ContinueURL : dw.web.URLUtils.https('JNewsletterV2-HandleForm'),
				CurrentForms :session.forms
			});
			return;
		} //try catch ends
	}
	else{
		
		ISML.renderTemplate('newsletter/newslettersignup', {
			ContinueURL : dw.web.URLUtils.https('JNewsletterV2-HandleForm'),
			CurrentForms :session.forms
		});
		return;
	}
}
exports.Start = guard.ensure(['get'],start);
exports.HandleForm=guard.ensure([],handleForm);