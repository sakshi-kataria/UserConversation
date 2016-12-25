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
        console.log('Error occurred in client method "createNewUser"', error);
        throw new Meteor.Error(error);
      }
    },
    sendMessage: function (user1,user2,userCo) {
      try {
        let user=userConversation.find({ $and: [ { $or: [ { "user1": user1 },
           { "user2": user1 } ] },{ $or: [ { "user1": user2 }, { "user2": user2 } ] } ] }).fetch();

        if(user[0] && user[0]._id){
         userConversation.update({_id:user[0]._id},{$addToSet:{"conversation":userCo}})
       }else {
            userConversation.insert({
                "user1": user1, "user2": user2,
                conversation: [userCo]
            });
          }
        }
        catch (error) {
          console.log('Error occurred in client method "sendMessage"',error);
          throw new Meteor.Error(error);
        }
      }
  });
}
