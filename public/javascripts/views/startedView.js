// This is the view for the started column
Sprint.Views.StartedView = Sprint.Views.AbstractPanelView.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({ 
        	collection: Sprint.Tasks.started() ,
			total: this.total_points_left(Sprint.STARTED_COLUMN)
			}));
	    $('#items_started').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": Sprint.STARTED_COLUMN});
        task.set({"user": Sprint.User.get("email")});
        var gravatar = $.gravatarSrc(Sprint.User.get("email"),'?s=40&d=mm');
        task.set({"gravatar": gravatar});
	    task.save();
	    this.render();
    },

    sort_stop: function() {
	   // I think is better dont keep the order in this column
    }
});