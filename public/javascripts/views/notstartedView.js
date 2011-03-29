// This is the view for the backlog column
Varavig.Views.NotStartedView = Varavig.Views.AbstractPanelView.extend({

    initialize: function() {
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({ 
        	collection: this.collection.not_started()
        	}));
        $('#tasks_not_started').html(this.el);
        $('#total_not_started').html(this.total_points_left(Varavig.NOTSTARTED_COLUMN));
		this.sortable_tasks();
		this.truncate_long_texts();
        this.delegateEvents();
        return this;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = this.collection.get(ui.item.context);
        task.set({"incolumn": Varavig.NOTSTARTED_COLUMN});
        task.save();
    },

    sort_stop: function() {
        // I think is better don't keep the order here
    }
});
   