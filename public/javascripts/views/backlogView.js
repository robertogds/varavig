// This is the view for the backlog column
Varavig.Views.BacklogView = Varavig.Views.AbstractPanelView.extend({
    	
    initialize: function() {
        this.render();
		this.task_list = this.collection;
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({
        	collection: this.collection.backlog() ,
			total: this.total_points_left(Varavig.BACKLOG_COLUMN)
        	}));
        $('#items').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = this.collection.get(ui.item.context);
        task.set({"incolumn": Varavig.BACKLOG_COLUMN});
        task.save();
        this.render();
    },

    sort_stop: function() {
        var orden = 1;
        var result = this.$('.sortable_tasks').sortable('toArray');
        var task = new Task();
        _.each(result, function(num) {
            task = this.collection.get(num);
            if (task.get("position") != orden) {
                task.set({"position": orden});
                task.save();
            }
            orden++;
        });
    }
});