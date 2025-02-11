//=========================================================================
// Fake Server Side Code
//=========================================================================

import { displayTemplate, formTemplate } from './templates.js';
import { createServer, init, onGet, onPut } from './server_infrastructure.js';

// data
var contact = {
    "firstName" : "Joe",
    "lastName" : "Blow",
    "email" : "joe@blow.com"
};

window.server = createServer();

// routes
init("/contact/1", function(request){
    return displayTemplate(contact);
});

onGet("/contact/1/edit", function(request){
    return formTemplate(contact);
});

onPut("/contact/1", function (req, params) {
    contact.firstName = params['firstName'];
    contact.lastName = params['lastName'];
    contact.email = params['email'];
    return displayTemplate(contact);
});

