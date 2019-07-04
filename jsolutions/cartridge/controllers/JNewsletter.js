'use strict';


var ISML = require('dw/template/ISML');
var guard = require('double2_controllers/cartridge/scripts/guard');


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
      if ( (TriggeredAction != null) && (TriggeredAction.formId == 'subscribe') ){
    	
            ISML.renderTemplate('newsletter/newslettersuccess', {
                CurrentForms    : session.forms
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

