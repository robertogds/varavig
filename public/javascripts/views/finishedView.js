// This is the view for the finished column
Varavig.Views.FinishedView = Varavig.Views.AbstractPanelView.extend({

    initialize: function() {
    },    
    
    render: function() {
		$(this.el).html(_.template($('#tasks_collection').html())({ 
			collection: this.collection.finished()
			}));
        $('#tasks_finished').html(this.el);
        $('#total_finished').html(this.total_points_left(Varavig.FINISHED_COLUMN));
        //this.jquery_task();
		this.sortable_tasks();
		this.truncate_long_texts();
        this.delegateEvents();
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = this.collection.get(ui.item.context);
        task.set({"incolumn": Varavig.FINISHED_COLUMN});
		task.set({"left": 0}); 
	    task.save();
		this.render();
    },

    sort_stop: function() {
	   // I think is better dont mantain the order in this column
    }
});