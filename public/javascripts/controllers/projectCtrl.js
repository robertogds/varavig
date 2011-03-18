// Controller for the projects
Varavig.Controllers.ProjectCtrl = Backbone.Controller.extend({
	
    routes: {
        "":              		"index",
        "new":           		"new_project",
		"project/:id":   		"show_project",
		"sprint/:id":    		"show_sprint",
		"sprint/:id/new_task":  "new_task"
    },

    index: function() {
        Varavig.Projects.fetch({
            success: function() {
                new Varavig.Views.ProjectListView;
            },
            error: function() {
                new Error({ message: "Error loading projects." });
            }
        });
    },

    new_project: function() {
        var project = new Project();
        new Varavig.Views.EditProject({ model: project, collection: Varavig.Projects });

    },

	show_project: function(id){
		var project = new Project({ id: id });
		
		project.fetch({
            success: function(){
				Varavig.Sprints = new Varavig.Collections.Sprints(project.get("sprints"));
                new Varavig.Views.SprintListView({ collection: Varavig.Sprints});
            },
            error: function() {
                new Error({ message: "Error loading projects." });
            }
        });	
	},
	
	show_sprint: function(id){
		var sprint = new Sprint({ id: id });		
		sprint.fetch({
           	success: function(){
				Varavig.Tasks = new Varavig.Collections.Tasks(sprint.get("tasks"));
				new Varavig.Views.SprintPanelView({ model: sprint });
                new Varavig.Views.FinishedView;
                new Varavig.Views.StartedView;
                new Varavig.Views.NotStartedView;
                new Varavig.Views.BacklogView;
            },
            error: function() {
                new Error({ message: "Error loading tasks." });
            }	
                
	    });
	},
	
	new_task: function(id) {
		var sprint = Varavig.Sprints.get(id);
        var task = new Task();
        task.position = Varavig.Tasks.nextOrder();
        task.done = 0;
		
        new Varavig.Views.EditTask({ model: task, collection: Varavig.Tasks , sprint: sprint});

    }
	

});