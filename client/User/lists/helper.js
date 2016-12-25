Template.userList.helpers({
  users: function () {
    const t = Template.instance();
    var userId = Meteor.userId();
    let filter = {_id: {$nin: [userId]}};
    return Meteor.users.find(filter).fetch();
  },
  name:function(){
    let user=Meteor.users.find({_id:Session.get('Reciever_id')},{fields:{username:1}}).fetch();
    if (user[0])
    return user[0].username;
    else {
      return "";
    }
  }
});

Template.userList.onRendered(function() {
  $('#smsForm').validate();
})
