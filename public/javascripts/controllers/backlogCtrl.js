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
	        var backlogItems = new Sprint.Collections.Stories();
	        backlogItems.fetch({
	            success: function() {
	                new Sprint.Views.BacklogView({ collection: backlogItems });
	            },
	            error: function() {
	                new Error({ message: "Error loading documents." });
	            }
	        });
	    },
		newStory: function() {
	        new Sprint.Views.EditStory({ model: new Story() });
	    }
});