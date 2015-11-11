Template.userLayout.onRendered(function(){

   $('.slider').slider({full_width: true});
   $('.button-collapse').sideNav({'edge': 'left'});
	$('.modal-trigger').leanModal();
   $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });


});
