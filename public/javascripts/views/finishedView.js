// This is the view for the finished column
Varavig.Views.FinishedView = Varavig.Views.AbstractPanelView.extend({

    initialize: function() {
        this.render();
    },
    
    
    render: function() {
		$(this.el).html(_.template($('#tasks_collection').html())({ 
			collection: Varavig.Tasks.finished(),
			total: this.total_points_left(Varavig.FINISHED_COLUMN)
			}));
        $('#items_finished').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = Varavig.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": Varavig.FINISHED_COLUMN});
		task.set({"left": 0}); 
	    task.save();
		this.render();
    },

    sort_stop: function() {
	   // I think is better dont mantain the order in this column
    }
});