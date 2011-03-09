// This is the view for the finished column
Sprint.Views.FinishedView = Sprint.Views.AbstractPanelView.extend({
	events: {
    "sortstop .sortable_tasks":  "sort_stop",
    "sortreceive": "sort_receive"
  },

    initialize: function() {
        this.render();
    },
    
    render: function() {
		$(this.el).html(_.template($('#tasks_collection').html())({ 
			collection: Sprint.Tasks ,
        	column: Sprint.FinishedColumn}));
        $('#items_finished').html(this.el);
        this.jquery_task();
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": Sprint.FinishedColumn});
	    task.save();
    },

    sort_stop: function() {
	   // I think is better dont mantain the order in this column
    }
});