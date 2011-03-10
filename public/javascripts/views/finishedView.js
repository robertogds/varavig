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
    	alert("finished in view:"+ Sprint.Tasks.finished().length);
		$(this.el).html(_.template($('#tasks_collection').html())({ 
			//TODO ver pq si pones esto peta
			//collection: Sprint.Tasks.finished(),
			collection: Sprint.Tasks,
        	column: Sprint.FinishedColumn,
			total: this.total_points_left(Sprint.FinishedColumn)
			}));
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
		this.render();
    },

    sort_stop: function() {
	   // I think is better dont mantain the order in this column
    }
});