var Sprint = {
    Views: {},
    Controllers: {},
    Collections: {},
    init: function() {
    	this.set_globals();
        // call the controller
        new Sprint.Controllers.BacklogCtrl();
        Backbone.history.start();
    },
    
    set_globals: function() {
    	// Initialize global variables
    	// Create our global collection of **Tasks**.
        Sprint.Tasks = new Sprint.Collections.Tasks;
        
        // Column ids
        Sprint.BacklogColumn = 0;
        Sprint.NotStartedColumn = 1;
        Sprint.StartedColumn = 2;
        Sprint.FinishedColumn = 3;
        // User
        Sprint.User = new User();
        this.get_user();
    },
    
    get_user: function() {
    	
   	 Sprint.Users = new Sprint.Collections.Users;
        Sprint.Users.fetch({
           success: function() {
       	 		Sprint.User = Sprint.Users.at(0);
           },
           error: function() {
               new Error({ message: "Error loading users." });
               alert("Error cargando usuario");
           }
        });
        
     }
    
};


// Hide backlog. We must  remove it from here.
$('#collapseBacklog.expanded').live('click', function() {
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

$('#collapseBacklog.collapsed').live('click', function() {
    $('.container #backlog ').show();

    $('.container .column').animate({
        width: '25%'
    }, 1000, function() {
        // Animation complete.
    });

    $(this).addClass('expanded').removeClass('collapsed');
})









