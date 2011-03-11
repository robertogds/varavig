// This is the view for the backlog column
Sprint.Views.BacklogView = Sprint.Views.AbstractPanelView.extend({
    	
    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({
        	collection: Sprint.Tasks.backlog() ,
			total: this.total_points_left(Sprint.BACKLOG_COLUMN)
        	}));
        $('#items').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 0});
        task.set({"incolumn": Sprint.BACKLOG_COLUMN});
        task.save();
        this.render();
    },

    sort_stop: function() {
        var orden = 1;
        var result = this.$('.sortable_tasks').sortable('toArray');
        var task = new Task();
        _.each(result, function(num) {
            task = Sprint.Tasks.get(num);
            if (task.get("position") != orden) {
                task.set({"position": orden});
                task.save();
            }
            orden++;
        });
    }
});