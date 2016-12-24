import { Template } from 'meteor/templating';

Template.userChat.helpers({
    users: function () {
        let user;
        if(this[0].reciever_id){
            user=Meteor.users.find({_id:this[0].reciever_id}).fetch();
        }
        console.log('user',user[0].emails);
        return  userConversation.find({}).map(function(u) {
             u.conversation.forEach(function (data) {
                 let isReciever=data.senderId!==Meteor.userId();
                 data.Reciever=isReciever;
                 data.RecieverName=user[0].emails[0].address;
             });
             return u;
         });
    }
});
