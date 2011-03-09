// Controller for the backlog items column
Sprint.Controllers.BacklogCtrl = Backbone.Controller.extend({
    routes: {
        "":              "index",
        "task/:id":      "edit",
        "savetask":      "saveTask",
		"new":           "newTask"
    },
    
	edit: function(id) {
        var task = new Task({ id: id });
        task.fetch({
            success: function(model, resp) {
                new Sprint.Views.EditTask({ model: task });
            },
            error: function() {
                new Error({ message: 'Could not find that document.' });
                window.location.hash = '#';
            }
        });
    },
      index: function() {
	        Sprint.Tasks.fetch({
	            success: function() {
					new Sprint.Views.FinishedView;
					new Sprint.Views.StartedView;
                    new Sprint.Views.NotStartedView;
                    new Sprint.Views.BacklogView;
                    
	            },
	            error: function() {
	                new Error({ message: "Error loading documents." });
	            }
	        });
	    },

        saveTask: function() {
            this.index();
        },
		
		newTask: function() {
			var task = new Task();
			task.position = Sprint.Tasks.nextOrder();
			task.done = 0;
	        new Sprint.Views.EditTask({ model: task, collection: Sprint.Tasks });

	    }
	   
});