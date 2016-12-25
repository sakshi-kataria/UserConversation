Template.login.onCreated(function() {
  Session.set('lastError','');
});

Template.login.helpers({
  errorMessage: function() {
    return Session.get('lastError');
  }
});

Template.login.onRendered(function() {
  validateFields();
});

Template.login.events({
  'click #register': function(event) {
    try{
      event.preventDefault();
      Session.set('lastError','');
      let userDoc = new Object();
      userDoc.email = $('[id="email"]').val();
      let username= $('[id="first_name"]').val() + " " + $('[id="last_name"]').val();
      userDoc.username = username;
      userDoc.password = $('[id="password"]').val();
      validateFields();

      if(!$("#validationform").valid()){
          return;
      }else{
        if(Meteor.users.find({$or:[{"email.0.address":$('[id="email"]').val(),"username":username}]}).fetch().length>0){
          Session.set('lastError',"Email or Username already exists");
          return;
        }else{
        Meteor.call('createNewUser', userDoc, function(error) {
          console.log('error:',error);
          });
          Router.go('signin');
        }
      }
    }
    catch(error){
        console.log('Error occurred on Submit for Registration:', error);
    }

      },
  'click #homeSignIn': function(event) {
      event.preventDefault();
      Router.go('signin');
  }

});

function validateFields(){
  try{
    $('#validationform').validate({
          rules : {
            password:{
              required: true,
              minlength : 5
            },
            password_confirm : {
                  minlength : 5,
                  equalTo : "#password"
              }
          }
        });
      }
  catch(error){
      console.log('Error occurred in validation of Registration ', error);
  }

}
