// This is the view for the backlog column
Sprint.Views.StartedView = Backbone.View.extend({
	events: {
    "sortstop .started":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
	    $(this.el).html(JST.started_collection({ collection: Sprint.Tasks }));
        $('#items_started').html(this.el);
        $( ".started" ).sortable({
			connectWith: ".nostart"
		});

        $( ".started" ).disableSelection();

        return this;
    },

    receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
	    task.set({"started": 1});
	    task.save();
    },

    sortstop: function() {
	   // I think is better dont mantain the order in this column
    }
});