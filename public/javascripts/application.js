var Sprint = {
    // CONSTANTS
    BACKLOG_COLUMN: 0,
    NOTSTARTED_COLUMN :1,
    STARTED_COLUMN:2,
    FINISHED_COLUMN: 3,

    Views: {},
    Controllers: {},
    Collections: {},

    init: function() {
          // User
        Sprint.User = new User();
        this.get_user();
        // Create our global collection of **Tasks**.
        Sprint.Tasks = new Sprint.Collections.Tasks();
    	// call the controller
		//Sprint.Controller = new Sprint.Controllers.BacklogCtrl();
        new Sprint.Controllers.BacklogCtrl();
		Backbone.history.start();
    },
    
    get_user: function() {
   	 Sprint.Users = new Sprint.Collections.Users;
        Sprint.Users.fetch({
           success: function() {
       	 		Sprint.User = Sprint.Users.at(0);
       	 		$('#gravatar').gravatarImg(Sprint.User.get("email"),'?s=37&d=mm');
           },
           error: function() {
               new Error({ message: "Error loading users." });
               alert("Error cargando usuario");
           }
        });
        
     }
    
};


//Hide backlog. We must  remove it from here.
$('#collapseBacklog.expanded').live('click', function() {
    $('.container .column').removeClass('four-columns').addClass('three-columns');

    $('.container #backlog').hide();
    $("#not_started .wrap").addClass('first');
    $(this).addClass('collapsed').removeClass('expanded');
});

$('#collapseBacklog.collapsed').live('click', function() {
    $('.container #backlog ').show();

    $('.container .column').removeClass('three-columns').addClass('four-columns');

    $(this).addClass('expanded').removeClass('collapsed');
    $("#not_started .wrap").removeClass('first');
});

