Template.userList.events({
    'click .mail-btn': function(event) {
      //set session of reciever to send message
      if($(event.currentTarget))
        Session.set('Reciever_id',$(event.currentTarget)[0].attributes.dataid.value)
     },
    'click #sendMsg': function(event) {
      try{
        event.preventDefault();
        let userInfo=new Object();
        userInfo.recieverId=Session.get('Reciever_id');
        userInfo.Message=$('[id="txtMessage"]').val();
        userInfo.senderId=Meteor.userId();
        userInfo.created_at=new Date();
        $('#smsForm').validate({
          rules:{
            txtMessage:{required: true}
          }}
        );
        if(!$('#smsForm').valid()){
          return;
        }else {
          $('[id="txtMessage"]').val('');
          Meteor.call('sendMessage',Session.get('Reciever_id'),Meteor.userId(), userInfo, function(error) {
            console.log(error);
          });
          $('#myModal').modal('hide')
        }

      }
      catch(error){
          console.log(`Error Occurs While sending Message:${error}`);
      }
    },
    'click .Conversation': function() {
      //send reciever id from router to show conversation with current user
      if($(event.target))
        Router.go('userChat', {reciever_id:$(event.target)[0].attributes.msgID.value});
    }
});
