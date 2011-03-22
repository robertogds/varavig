// This is the view for the backlog column
Varavig.Views.BacklogView = Varavig.Views.AbstractPanelView.extend({
    	
    initialize: function() {
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({
        	collection: this.collection.backlog() 
        	}));
        $('#tasks_backlog').html(this.el);
		$('#total_backlog').html(this.total_points_left(Varavig.BACKLOG_COLUMN));
        //this.jquery_task();
		this.sortable_tasks();
		this.truncate_long_texts();
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