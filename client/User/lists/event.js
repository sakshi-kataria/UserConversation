
Template.userList.events({
    'click .mail-btn': function(event) {
        Session.set('Reciever_id',$(event.currentTarget)[0].attributes.dataid.value)
     },
    'click #sendMsg': function() {
        let userInfo=new Object();
        userInfo.recieverId=Session.get('Reciever_id');
        userInfo.Message=$('[id="txtMessage"]').val();
        userInfo.senderId=Meteor.userId();
        userInfo.created_at=new Date();

        Meteor.call('sendMessage',Session.get('Reciever_id'),Meteor.userId(), userInfo, function(error) {
          console.log(error);
        });
    },
    'click .btn-link': function() {
        console.log('$(event.currentTarget)[0]',$(event.target)[0].attributes.msgID.value);
        Router.go('userChat', {reciever_id:$(event.target)[0].attributes.msgID.value});
    }
});
