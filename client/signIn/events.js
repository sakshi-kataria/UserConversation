import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

Template.signin.events({
'click #signin': function(event) {
        let emailVal = $('[id="email"]').val();
        let passwordVal = $('[id="password"]').val();
        Meteor.loginWithPassword(emailVal, passwordVal, function (error) {
              if (error) {
                console.log("Error Occurs While Login: " + error);
                return false;
              } else {
                  Router.go("getUserList");
                  console.log('Successful login');
              }
        });
}
});
