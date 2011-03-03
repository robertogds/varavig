// This is the view for the finished column
Sprint.Views.FinishedView = Backbone.View.extend({
	events: {
    "sortstop .finished":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
	    $(this.el).html(JST.finished_collection({ collection: Sprint.Tasks }));
        $('#items_finished').html(this.el);
        $( "#finishedi" ).sortable({
			connectWith: ".subcolumn"
		});

        $( ".finishedi" ).disableSelection();

        return this;
    },

    receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
	    task.set({"finished": 1});
	    task.save();
    },

    sortstop: function() {
	   // I think is better dont mantain the order in this column
    }
});