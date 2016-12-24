import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';


Template.login.onRendered(function() {
  $(function(){
    console.log("1");
    $('#validationform').validate({
          rules : {
              password : {
                  minlength : 5
              },
              password_confirm : {
                  minlength : 5,
                  equalTo : "#password"
              }
          }
  });
  })

});

Template.login.events({
  'click #register': function(event) {
      event.preventDefault();
      let userDoc = new Object();
      userDoc.email = $('[id="email"]').val();
      userDoc.name = $('[id="first_name"]').val() + " " + $('[id="last_name"]').val();
      userDoc.password = $('[id="password"]').val();
      console.log('userDoc',userDoc);
      Meteor.call('createNewUser', userDoc, function(error) {
        console.log(error);
      });
      Router.go('signin');
  },
  'click #homeSignIn': function(event) {
      event.preventDefault();
      Router.go('signin');
  }

});
