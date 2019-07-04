'use strict';
/** @module controllers/JNewsletter */
var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');

/* use quickcard section “Handling Forms” to get Form object of type newsletter */
	var newsletterForm = 
function start() {
	/* use quickcard section “Handling Forms” to clear the form 
	 * object above(newsletterform
	*/
		
	/* Use quickcard to render newsletter/newslettersignup isml. 
	 * The pipeline to handle the 	submission is JNewsletter-HandleForm 
	 * */
	
}
function handleForm() {
	var TriggeredAction = request.triggeredFormAction;
	response.getWriter().println('Hello World from pipeline controllers!'+TriggeredAction);
	if ( (TriggeredAction != null) && (TriggeredAction.formId == 'subscribe') ){
			//response.getWriter().println('Hello World from pipeline controllers!'+newsletterForm.fname.value);
			ISML.renderTemplate('newsletter/newslettersuccess', {
				
			});
			return;
		}
	else{
		ISML.renderTemplate('newsletter/newslettersignup', {
			ContinueURL : dw.web.URLUtils.https('JNewsletter-HandleForm'),
			CurrentForms :session.forms
		});
	}
}
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure([], handleForm);