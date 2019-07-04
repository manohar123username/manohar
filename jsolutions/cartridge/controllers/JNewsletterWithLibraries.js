'use strict';


var URLUtils = require('dw/web/URLUtils');
var app = require('double2_controllers/cartridge/scripts/app');
var guard = require('double2_controllers/cartridge/scripts/guard');

 function start(){
     app.getForm('newsletter').clear();  //equivalent of clearformelement	 
     app.getView({
        Action: 'subscribe',
        ContinueURL: URLUtils.https('JNewsletterWithLibraries-HandleForm')
             }).render('newsletter/newslettersignup');
 }
	 function handleForm() {          
	   // Address = app.getModel('Address');
		
		 var newsletterForm = app.getForm('newsletter');
		  response.getWriter().println('Hello World from pipeline controllers!'+newsletterForm.object.fname.value);
		  newsletterForm.handleAction({     //inline function to process form
			subscribe: function () {	
				app.getView({
							CurrentForms  : session.forms
							}).render('newsletter/newslettersuccess');
					return;
			},
	  
			error: function () {
				success = false;
			}
		   
		});

   // response.redirect(URLUtils.https('Newsletter-Start'));
}
 
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure([], handleForm);