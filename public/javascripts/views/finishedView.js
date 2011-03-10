// This is the view for the finished column
Sprint.Views.FinishedView = Sprint.Views.AbstractPanelView.extend({

    initialize: function() {
        this.render();
    },
    
    
    render: function() {
		$(this.el).html(_.template($('#tasks_collection').html())({ 
			//TODO ver pq si pones esto peta
			//collection: Sprint.Tasks.finished(),
			collection: Sprint.Tasks,
        	column: Sprint.FINISHED_COLUMN,
			total: this.total_points_left(Sprint.FINISHED_COLUMN)
			}));
        $('#items_finished').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": Sprint.FINISHED_COLUMN});
	    task.save();
		this.render();
    },

    sort_stop: function() {
	   // I think is better dont mantain the order in this column
    }
});