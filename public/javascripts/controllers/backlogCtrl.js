// Controller for the backlog items column
Sprint.Controllers.BacklogCtrl = Backbone.Controller.extend({
    routes: {
        "":              "index",
        "task/:id":      "edit",
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
                    new Sprint.Views.NotStartedView;
                    new Sprint.Views.BacklogView;
	            },
	            error: function() {
	                new Error({ message: "Error loading documents." });
	            }
	        });
	    },

		
		newTask: function() {
			var task = new Task({title : "TITULO"});
			task.position = Sprint.Tasks.nextOrder();
			task.done = 0;
            alert(task.title);
	        new Sprint.Views.EditTask({ model: task, collection: Sprint.Tasks });

	    }
});