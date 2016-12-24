import { Template } from 'meteor/templating';

Template.userList.helpers({
  users: function () {
    const t = Template.instance();
    var userId = Meteor.userId();
    let filter = {_id: {$nin: [userId]}};
    console.log('users',Meteor.users.find(filter).fetch());
    return Meteor.users.find(filter).fetch();
  }
});
