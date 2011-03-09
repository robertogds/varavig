// This is the view for the started column
Sprint.Views.StartedView = Sprint.Views.AbstractPanelView.extend({
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
        	column: Sprint.StartedColumn}));
	    $('#items_started').html(this.el);
        this.jquery_task();
        return this;
    },


    sort_receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": Sprint.StartedColumn});
        task.set({"user": Sprint.User.get("email")});
	    task.save();
	    this.render();
    },

    sort_stop: function() {
	   // I think is better dont keep the order in this column
    }
});