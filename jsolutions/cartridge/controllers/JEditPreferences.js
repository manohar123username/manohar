'use strict';

/** @module controllers/JEditPreferences */

var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');

/*************************************************** **************   
 * 
	Use require syntax to get URLUtils from dw.web package 
 * ************** ************** ************** ************** */

var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');

/*************************************************** **************   
 Use quickcard section “Handling Forms” to get Form object named preferencesForm from the
 meta data named preferences
*
************** ************** ************** */

var preferencesForm = session.forms.preferences;

function start() {

     /*************************************   
     Use quickcard section “Handling Forms” clear the preferences from */
	/* Use quickcard “Handling Forms” to find a method to prefill the form from
	customer.profile system object 
   ************** ************** ************** */	

	
	preferencesForm.clearFormElement();
	preferencesForm.copyFrom(customer.profile); // UpdateFormWithObject
	
	ISML.renderTemplate('account/user/editpreferences.isml', {
		ContinueURL : dw.web.URLUtils.https('JEditPreferences-HandleForm'),
		CurrentForms : session.forms
	});
}


function handleForm() {

	var TriggeredAction = request.triggeredFormAction;

	Transaction.begin();
	/*************** ************** **************  
	 * Store preferencesForm to the sytem object customer.profile 
	 * 
	 *************** ************** **************  */

	   preferencesForm.copyTo(customer.profile); // UpdateObjectWithForm
	Transaction.commit();

	response.redirect(URLUtils.https('Account-Show'));
	return;

}

exports.Start = guard.ensure([ 'get', 'https', 'loggedIn' ], start);
exports.HandleForm = guard.ensure([ 'post' ], handleForm);
