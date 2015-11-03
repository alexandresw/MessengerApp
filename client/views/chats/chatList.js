Template.chatList.onRendered(function(){

   $.ajax({
     url: 'http://api.randomuser.me/?results=5&seed=1234&nat=US',
     dataType: 'json',
     success: function(data){
       Session.set("chatList", data.results);
     }
   });

});

Template.chatList.helpers({
   chatList: function(){
      return Session.get("chatList");
   }
});
