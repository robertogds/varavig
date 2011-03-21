// Controller for the projects
Varavig.Controllers.ProjectCtrl = Backbone.Controller.extend({
	
    routes: {
        "":              									"index",
        "new":           									"new_project",
		"project/:id":   									"show_project",
		"project/:project_id/sprint/:sprint_id":    		"show_sprint",
		"project/:project_id/sprint/:id/new_task":  		"new_task"
    },

    index: function() {
	   	// Create our global collection of **Projects**.
	    var projects = new Varavig.Collections.Projects();
        projects.fetch({
            success: function() {
                new Varavig.Views.ProjectListView({ model: new Project(), collection: projects });
            },
            error: function() {
                new Error({ message: "Error loading projects." });
            }
        });
    },

    new_project: function() {
        var project = new Project();
        new Varavig.Views.EditProject({ model: project });

    },

	show_project: function(id){
		var project = new Project({ id: id });
		var self = this;
		project.fetch({
            success: function(){
				self.sprints = new Varavig.Collections.Sprints(project.get("sprints"));
                new Varavig.Views.SprintListView({ collection: self.sprints });
            },
            error: function() {
                new Error({ message: "Error loading projects." });
            }
        });	
	},
	
	show_sprint: function(project_id, sprint_id){
		var sprint = new Sprint({ id: sprint_id });		
		sprint.fetch({
           	success: function(){
				var tasks = new Varavig.Collections.Tasks(sprint.get("tasks"));
				new Varavig.Views.SprintPanelView({ model: sprint, collection: tasks });
                new Varavig.Views.FinishedView({ collection: tasks });
                new Varavig.Views.StartedView({ collection: tasks});
                new Varavig.Views.NotStartedView({ collection: tasks });
                new Varavig.Views.BacklogView({ collection: tasks});
            },
            error: function() {
                new Error({ message: "Error loading tasks." });
            }	
                
	    });
	},
	
	new_task: function(project_id, sprint_id) {
		var sprint = new Sprint({ id: sprint_id });
        var task = new Task({sprint: sprint});
		
        new Varavig.Views.EditTask({ model: task });

    }	

});