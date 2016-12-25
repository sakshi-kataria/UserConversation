Template.userChat.helpers({
    users: function () {
      try{
        let user;
        if(this[0].reciever_id){
            user=Meteor.users.find({_id:this[0].reciever_id}).fetch();
        }
        return  userConversation.find({}).map(function(u) {
             u.conversation.forEach(function (data) {
                 let isReciever=data.senderId!==Meteor.userId();
                 data.Reciever=isReciever;
                 data.RecieverName=user[0].username;
             });
             return u;
         });
      }
      catch(error){
            console.log('Error Occurs While showing user conversation: ',error);
      }
    }
});
//

Template.userChat.events({
'click .btn-back': function(event) {
    Router.go("getUserList");
}
});
