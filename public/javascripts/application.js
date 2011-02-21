var Sprint = {	
	Views: {},
	Controllers: {},
	Collections: {},
	init: function() {	  
	 // Create our global collection of **user Stories**.
	  Sprint.Stories = new Sprint.Collections.Stories(); 
	  new Sprint.Controllers.BacklogCtrl();
      Backbone.history.start();
	}
};



// Jquery code only must be in views but we'll refactor soon
// Esto no debe estar aqui sino en las vistas pero luego lo quito



$('#collapseBacklog.expanded').live('click',function(){
	$('.container #not_started, .container #started, .container #finished').animate({
		width: '33%'
	  }, 1000, function() {
		// Animation complete.
	  });
	
	$('.container #backlog').animate({
		width: '0'
	  }, 1000, function() {
		// Animation complete.
		$(this).hide();
	  });
	$(this).addClass('collapsed').removeClass('expanded');
});

$('#collapseBacklog.collapsed').live('click',function(){
	$('.container #backlog ').show();
	
	$('.container .column').animate({
		width: '25%'
	  }, 1000, function() {
		// Animation complete.
	  });

	$(this).addClass('expanded').removeClass('collapsed');
})






