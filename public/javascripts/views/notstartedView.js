// This is the view for the backlog column
Sprint.Views.NotStartedView = Sprint.Views.AbstractPanelView.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({ 
        	collection: Sprint.Tasks.not_started(),
			total: this.total_points_left(Sprint.NOTSTARTED_COLUMN)
        	}));
        $('#items_nostart').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint":1});
        task.set({"incolumn": Sprint.NOTSTARTED_COLUMN});
        task.save();
        this.render();
    },

    sort_stop: function() {
        // I think is better don't keep the order here
    }
});
   