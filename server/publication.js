import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
  try {
    return Meteor.users.find({},{fields:{emails:1,username:1}});
  }
  catch(e) {
   console.log(`Error occurred in publishing "users" ${e}`);
    throw new Meteor.Error(e.toString());
  }
});


Meteor.publish('usersConversation', function (reciever_id) {
  try {
    let userId=this.userId;
    return [
      userConversation.find({ $and: [ { $or: [ { "user1": reciever_id },
      { "user2": reciever_id } ] },{ $or: [ { "user1": userId }, { "user2": userId } ] } ] },{fields:{"conversation":1}}),
        Meteor.users.find({
          _id: reciever_id
        },{fields:{emails:1,username:1}})
    ]
  }
  catch(e) {
    console.log(`Error occurred in publishing "usersConversation" ${e}`);
    throw new Meteor.Error(e.toString());
  }
});
