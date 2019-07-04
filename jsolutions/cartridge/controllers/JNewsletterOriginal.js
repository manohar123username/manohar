'use strict';

/** @module controllers/JNewsletterOriginal */

var ISML = require('dw/template/ISML');
var guard = require('storefront_controllers/cartridge/scripts/guard');
var newsletterForm = session.forms.newsletter;

function start() {
    newsletterForm.clearFormElement();
               ISML.renderTemplate('newsletter/newslettersignup', {
                        ContinueURL : dw.web.URLUtils.https('JNewsletter-HandleForm'),
                        CurrentForms :session.forms
                });
}

function handleForm() {

    var TriggeredAction = request.triggeredFormAction;
      response.getWriter().println('Hello World from pipeline controllers!'+TriggeredAction);
      if (TriggeredAction != null) {
        if (TriggeredAction.formId == 'subscribe') {
    	//response.getWriter().println('Hello World from pipeline controllers!'+newsletterForm.fname.value);
            ISML.renderTemplate('newsletter/newslettersuccess', {
                CurrentForms    : session.forms
            }); 
            return;
  
		}
      }

}

exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure([], handleForm);

