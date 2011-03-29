var Varavig = {
    // CONSTANTS
    BACKLOG_COLUMN: 0,
    NOTSTARTED_COLUMN :1,
    STARTED_COLUMN:2,
    FINISHED_COLUMN: 3,
	COLUMNS: [{"name":"backlog", "title": "Backlog"},{"name":"not_started", "title": "Not Started Item"},{"name":"started", "title": "Started Tasks"},{"name":"finished", "title": "Finished Tasks"}],
    Views: {},
    Controllers: {},
    Collections: {},

    init: function() {
	
          // Create our global User varible
        var users = new Varavig.Collections.Users;
        users.fetch({
           success: function() {
       	 		var user = users.at(0);
				var projects = new Varavig.Collections.Projects();
			    projects.fetch({
						success: function(){
							// call the controller
							new Varavig.Controllers.ProjectCtrl({user: user, projects: projects});
							Backbone.history.start();
			            },
			            error: function() {
			                new Error({ message: "Error loading projects." });
			            }
			     });
           },
           error: function() {
               var e = new Error({ message: "Error loading users." });
               alert(e);
           }
        });

    }
    
};


