// Controller for the backlog items column
Sprint.Controllers.BacklogCtrl = Backbone.Controller.extend({
    routes: {
        "":              "index",
        "story/:id":     "edit",
		"new":           "newStory"
    },
    
	edit: function(id) {
        var story = new Story({ id: id });
        story.fetch({
            success: function(model, resp) {
                new Sprint.Views.EditStory({ model: story });
            },
            error: function() {
                new Error({ message: 'Could not find that document.' });
                window.location.hash = '#';
            }
        });
    },
      index: function() {
	        Sprint.Stories.fetch({
	            success: function() {
                    //alert(JSON.stringify(Sprint.Stories.done()));
                    //alert("dones = " + dones.length());
                    new Sprint.Views.NotStartedView;
                    new Sprint.Views.BacklogView;
	            },
	            error: function() {
	                new Error({ message: "Error loading documents." });
	            }
	        });
	    },

		
		newStory: function() {
			var story = new Story();
			story.order = Sprint.Stories.nextOrder();
			story.done = 0;
	        new Sprint.Views.EditStory({ model: story, collection: Sprint.Stories });

	    }
});