Template.signin.onCreated(function() {
  Session.set('lastError','');
});

Template.signin.helpers({
  errorMessage: function() {
    return Session.get('lastError');
  }
});
  Template.signin.events({
      'click #signin': function(event) {
        try{
            event.preventDefault();
            Session.set('lastError','');
            let emailVal = $('[id="email"]').val();
            let passwordVal = $('[id="password"]').val();
            $('#myForm').validate();
            if(!$("#myForm").valid()){
                return;
            }else{
            Meteor.loginWithPassword(emailVal, passwordVal, function (error) {
                  if (error) {
                    Session.set('lastError',error.reason);
                    console.log('error ',error.reason);
                  } else {
                      Router.go("getUserList");
                  }
            });
          }
        }
        catch(error){
          console.log('Error Occurs While Login: ',error);
        }

      },
      'click #gotoRegister': function(event) {
            Router.go('/');
      }
  });

  Template.signin.onRendered(function() {
    $('#myForm').validate();
  });

  Template.signOut.events({
    'click #menu-logout': function () {
        try{
          Meteor.logout(function (error) {
            Router.go('/');
            if (error) {
              throw error;
            }
          });
        }
        catch(error){
            console.log('Error occurred while logout: ',error);
        }
      }
  });
