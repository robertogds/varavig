// This is the view for the backlog column
Sprint.Views.NotStartedView = Backbone.View.extend({
	events: {
    "sortstop .nostart":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
	    $(this.el).html(JST.nostart_collection({ collection: Sprint.Stories }));
        $('#items_nostart').html(this.el);
        $( ".nostart" ).sortable({
			connectWith: ".stories"
		});

        $( ".stories" ).sortable({
			connectWith: ".nostart"
		});
        $( ".nostart" ).disableSelection();

        return this;
    },

    receive: function(event,ui) {
	    var story = new Story();
	    story = Sprint.Stories.get(ui.item.context);
	    story.set({"insprint": 1});
	    story.save();
    },

    sortstop: function() {
	   // I think is better dont mantain the order in this column
    }
});