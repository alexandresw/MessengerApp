Template.contactList.onRendered(function(){

   $.ajax({
     url: 'http://api.randomuser.me/?results=20&seed=1234&nat=US',
     dataType: 'json',
     success: function(data){
       Session.set("contactList", data.results);
     }
   });

});

Template.contactList.helpers({
   contactList: function(){
      return Session.get("contactList");
   }
});
