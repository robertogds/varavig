// This is the view for the project sprint list
Varavig.Views.SprintListView = Backbone.View.extend({  
	events: {
        "click .delete_sprint": "delete_sprint"
    },

	initialize: function() {
		this.collection.bind('all', _.bind(this.render, this));
    },
	
    render: function() {
        $(this.el).html(_.template($('#sprints_collection').html())({ 
        	collection: this.collection
			}));
	    $('#main_container').html(this.el);
	    //TODO what is this for?
        //this.delegateEvents();
        return this;
    },

	delete_sprint: function(event){
        var sprint = new Sprint();
        sprint = this.collection.get(event.currentTarget.id);
        this.collection.remove(sprint);
        sprint.destroy();
    }

});