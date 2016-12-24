import { Meteor } from 'meteor/meteor';
// import userConversation from '../collection/collection.js'

if (Meteor.isServer) {
  Meteor.methods({
    createNewUser: function (userDoc) {
      try {
        let user = Meteor.users.find({'emails.address': userDoc.email});
        Accounts.createUser(userDoc);
      }
      catch (error) {
        console.log(`Error occurred in client method "createNewUser" ${error}`);
        throw new Meteor.Error(error.toString());
      }
    },
    sendMessage: function (user1,user2,userCo) {
        console.log('user1',user1);
        console.log('user2',user2);

        let user=userConversation.find({ $and: [ { $or: [ { "user1": user1 },
           { "user2": user1 } ] },{ $or: [ { "user1": user2 }, { "user2": user2 } ] } ] }).fetch();

        console.log('user',user[0]);

        if(user[0] && user[0]._id){
         userConversation.update({_id:user[0]._id},{$addToSet:{"conversation":userCo}})
       }else {
            userConversation.insert({
                "user1": user1, "user2": user2,
                conversation: [userCo]
            });
        }
        console.log('userConversation',userConversation.find({}).fetch());

    }
  });
 //
 //  UserStatus.events.on("connectionLogout", function(userId) {
 //   var _user=Meteor.users.findOne({_id: userId.userId});
 //   if(_user){
 //     if(! _.isEmpty(_user.services.resume.loginTokens)) {
 //         Meteor.users.update({_id: _user._id}, {$set: {"services.resume.loginTokens": []}});
 //     }
 //   }
 // });
}
