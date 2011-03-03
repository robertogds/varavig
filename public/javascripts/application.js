var Sprint = {	
	Views: {},
	Controllers: {},
	Collections: {},
	init: function() {
	 // Create our global collection of **Tasks**.
	  Sprint.Tasks = new Sprint.Collections.Tasks(); 
	  new Sprint.Controllers.BacklogCtrl();
      Backbone.history.start();
	}
};

// Hide backlog. We must  remove it from here.
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









