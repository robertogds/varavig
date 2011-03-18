var Varavig = {
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
        Varavig.User = new User();
        this.get_user();

        // Create our global collection of **Projects**.
        Varavig.Projects = new Varavig.Collections.Projects();

		// Create our  collection of **Sprints**.
        Varavig.Sprints = null;

        // Create our global collection of **Tasks**.
        Varavig.Tasks = null;
    
    	// call the controller
        //new Sprint.Controllers.BacklogCtrl();
		new Varavig.Controllers.ProjectCtrl();
		Backbone.history.start();
    },
    
    get_user: function() {
   	 Varavig.Users = new Varavig.Collections.Users;
        Varavig.Users.fetch({
           success: function() {
       	 		Varavig.User = Varavig.Users.at(0);
       	 		$('#gravatar').gravatarImg(Varavig.User.get("email"),'?s=37&d=mm');
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

