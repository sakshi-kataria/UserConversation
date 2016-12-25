import { Router } from 'meteor/iron:router'

Router.route('/users/signIn', {
  name: 'signin',
  template: 'signin'
});

Router.route('/', function () {
    this.render('login');
});

Router.route('/users/list', {
  name: 'getUserList',
  template: 'userList',
  waitOn: function () {
   return [
     Meteor.subscribe('users',{
       onStop: function (error) {
         if(error)
           console.log(`Error while subscription of "users" ${error}`);
       }}
     )
   ]
 }
});

Router.route('/users/conversation/:reciever_id', {
    name: 'userChat',
    template: 'userChat',
    waitOn: function () {
        return [
            Meteor.subscribe('usersConversation', this.params.reciever_id,{
            onStop: function (error) {
            if(error)
                console.log(`Error while subscription of "usersConversation" ${error}`);
            }})
        ]
    },
    data: function () {
        return [{reciever_id:this.params.reciever_id}];
    }
});
