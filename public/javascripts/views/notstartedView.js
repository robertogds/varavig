// This is the view for the backlog column
Varavig.Views.NotStartedView = Varavig.Views.AbstractPanelView.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({ 
        	collection: this.collection.not_started(),
			total: this.total_points_left(Varavig.NOTSTARTED_COLUMN)
        	}));
        $('#items_nostart').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = this.collection.get(ui.item.context);
        task.set({"incolumn": Varavig.NOTSTARTED_COLUMN});
        task.save();
        this.render();
    },

    sort_stop: function() {
        // I think is better don't keep the order here
    }
});
   