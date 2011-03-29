// This is the view for the started column.
Varavig.Views.StartedView = Varavig.Views.AbstractPanelView.extend({
	
	initialize: function() {
    },
   
    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({ 
        	collection: this.collection.started()
			}));
	    $('#tasks_started').html(this.el);
		$('#total_started').html(this.total_points_left(Varavig.STARTED_COLUMN));
        
        //this.jquery_task();
		this.sortable_tasks();
		this.truncate_long_texts();
        this.delegateEvents();
        
        return this;
    },

    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = this.collection.get(ui.item.context);
        task.set({"incolumn": Varavig.STARTED_COLUMN});
		//assign task to current user 
        task.set({"user": Varavig.User.get("email")});
		//fetch gravatar from current user gravatar account
        var gravatar = $.gravatarSrc(Varavig.User.get("email"),'?s=23&d=mm');
        task.set({"gravatar": gravatar});
	    task.save();
    },

    sort_stop: function() {
	   // I think is better dont keep the order in this column
    }
});